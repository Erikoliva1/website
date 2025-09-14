import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  adminLoginSchema,
  insertMusicTrackSchema,
  insertYoutubeVideoSchema,
  insertGalleryImageSchema,
  insertEventSchema
} from "@shared/schema";
import { z } from "zod";
import { hashPassword, verifyPassword, generateToken, verifyToken, createDefaultAdmin } from "./auth";

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      // In development, allow bypass if reCAPTCHA is not configured
      if (process.env.NODE_ENV === 'development') {
        console.warn("RECAPTCHA_SECRET_KEY is not configured - bypassing in development");
        return true;
      }
      console.error("RECAPTCHA_SECRET_KEY is not configured");
      return false;
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}

// Auth middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
  
  (req as any).admin = decoded;
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Ensure default admin exists
  const defaultAdminCredentials = createDefaultAdmin();
  const existingAdmin = await storage.getAdminByUsername(defaultAdminCredentials.username);
  if (!existingAdmin) {
    const hashedPassword = await hashPassword(defaultAdminCredentials.password);
    await storage.createAdmin({
      username: defaultAdminCredentials.username,
      passwordHash: hashedPassword
    });
    console.log("Default admin user has been created");
  }

  // Public routes
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      
      // Verify reCAPTCHA token
      const isValidRecaptcha = await verifyRecaptcha(contactData.recaptchaToken);
      if (!isValidRecaptcha) {
        res.status(400).json({ 
          message: "reCAPTCHA verification failed. Please try again." 
        });
        return;
      }
      
      // Remove recaptchaToken before storing (it's only used for verification)
      const { recaptchaToken, ...contactToStore } = contactData;
      const contact = await storage.createContact(contactToStore);
      
      res.json({ 
        success: true, 
        message: "Message sent successfully!",
        contact 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating contact:", error);
        res.status(500).json({ 
          message: "Failed to send message. Please try again." 
        });
      }
    }
  });

  // Get music tracks
  app.get("/api/music-tracks", async (req, res) => {
    try {
      const tracks = await storage.getAllMusicTracks();
      res.json(tracks);
    } catch (error) {
      console.error("Error fetching music tracks:", error);
      res.status(500).json({ message: "Failed to fetch music tracks" });
    }
  });

  // Get YouTube videos
  app.get("/api/youtube-videos", async (req, res) => {
    try {
      const videos = await storage.getAllYoutubeVideos();
      res.json(videos);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      res.status(500).json({ message: "Failed to fetch YouTube videos" });
    }
  });

  // Get gallery images
  app.get("/api/gallery-images", async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json(images);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });

  // Get events
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  // Admin authentication
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = adminLoginSchema.parse(req.body);
      
      const admin = await storage.getAdminByUsername(username);
      if (!admin) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      
      const isValid = await verifyPassword(password, admin.passwordHash);
      if (!isValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      
      const token = generateToken(admin);
      res.json({ 
        success: true, 
        token, 
        admin: { id: admin.id, username: admin.username } 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid login data", 
          errors: error.errors 
        });
      } else {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Login failed" });
      }
    }
  });

  // Admin routes (protected)
  
  // Get all contacts
  app.get("/api/admin/contacts", requireAuth, async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Music tracks management
  app.post("/api/admin/music-tracks", requireAuth, async (req, res) => {
    try {
      const trackData = insertMusicTrackSchema.parse(req.body);
      const track = await storage.createMusicTrack(trackData);
      res.json(track);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid track data", errors: error.errors });
      } else {
        console.error("Error creating music track:", error);
        res.status(500).json({ message: "Failed to create music track" });
      }
    }
  });

  app.put("/api/admin/music-tracks/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = insertMusicTrackSchema.partial().parse(req.body);
      const track = await storage.updateMusicTrack(id, updateData);
      if (!track) {
        res.status(404).json({ message: "Music track not found" });
        return;
      }
      res.json(track);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid track data", errors: error.errors });
      } else {
        console.error("Error updating music track:", error);
        res.status(500).json({ message: "Failed to update music track" });
      }
    }
  });

  app.delete("/api/admin/music-tracks/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteMusicTrack(id);
      if (!success) {
        res.status(404).json({ message: "Music track not found" });
        return;
      }
      res.json({ success: true, message: "Music track deleted" });
    } catch (error) {
      console.error("Error deleting music track:", error);
      res.status(500).json({ message: "Failed to delete music track" });
    }
  });

  // YouTube videos management
  app.post("/api/admin/youtube-videos", requireAuth, async (req, res) => {
    try {
      const videoData = insertYoutubeVideoSchema.parse(req.body);
      const video = await storage.createYoutubeVideo(videoData);
      res.json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid video data", errors: error.errors });
      } else {
        console.error("Error creating YouTube video:", error);
        res.status(500).json({ message: "Failed to create YouTube video" });
      }
    }
  });

  app.put("/api/admin/youtube-videos/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = insertYoutubeVideoSchema.partial().parse(req.body);
      const video = await storage.updateYoutubeVideo(id, updateData);
      if (!video) {
        res.status(404).json({ message: "YouTube video not found" });
        return;
      }
      res.json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid video data", errors: error.errors });
      } else {
        console.error("Error updating YouTube video:", error);
        res.status(500).json({ message: "Failed to update YouTube video" });
      }
    }
  });

  app.delete("/api/admin/youtube-videos/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteYoutubeVideo(id);
      if (!success) {
        res.status(404).json({ message: "YouTube video not found" });
        return;
      }
      res.json({ success: true, message: "YouTube video deleted" });
    } catch (error) {
      console.error("Error deleting YouTube video:", error);
      res.status(500).json({ message: "Failed to delete YouTube video" });
    }
  });

  // Gallery images management
  app.post("/api/admin/gallery-images", requireAuth, async (req, res) => {
    try {
      const imageData = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(imageData);
      res.json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid image data", errors: error.errors });
      } else {
        console.error("Error creating gallery image:", error);
        res.status(500).json({ message: "Failed to create gallery image" });
      }
    }
  });

  app.put("/api/admin/gallery-images/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = insertGalleryImageSchema.partial().parse(req.body);
      const image = await storage.updateGalleryImage(id, updateData);
      if (!image) {
        res.status(404).json({ message: "Gallery image not found" });
        return;
      }
      res.json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid image data", errors: error.errors });
      } else {
        console.error("Error updating gallery image:", error);
        res.status(500).json({ message: "Failed to update gallery image" });
      }
    }
  });

  app.delete("/api/admin/gallery-images/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteGalleryImage(id);
      if (!success) {
        res.status(404).json({ message: "Gallery image not found" });
        return;
      }
      res.json({ success: true, message: "Gallery image deleted" });
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      res.status(500).json({ message: "Failed to delete gallery image" });
    }
  });

  // Events management
  app.post("/api/admin/events", requireAuth, async (req, res) => {
    try {
      // Parse eventDate string to Date object if it's a string
      const requestBody = { ...req.body };
      if (requestBody.eventDate && typeof requestBody.eventDate === 'string') {
        requestBody.eventDate = new Date(requestBody.eventDate);
      }
      
      const eventData = insertEventSchema.parse(requestBody);
      const event = await storage.createEvent(eventData);
      res.json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid event data", errors: error.errors });
      } else {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Failed to create event" });
      }
    }
  });

  app.put("/api/admin/events/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      // Parse eventDate string to Date object if it's a string
      const requestBody = { ...req.body };
      if (requestBody.eventDate && typeof requestBody.eventDate === 'string') {
        requestBody.eventDate = new Date(requestBody.eventDate);
      }
      
      const updateData = insertEventSchema.partial().parse(requestBody);
      const event = await storage.updateEvent(id, updateData);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid event data", errors: error.errors });
      } else {
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Failed to update event" });
      }
    }
  });

  app.delete("/api/admin/events/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteEvent(id);
      if (!success) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.json({ success: true, message: "Event deleted" });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
