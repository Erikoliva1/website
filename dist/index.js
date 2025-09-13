// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  contacts;
  admins;
  musicTracks;
  youtubeVideos;
  galleryImages;
  events;
  constructor() {
    this.contacts = /* @__PURE__ */ new Map();
    this.admins = /* @__PURE__ */ new Map();
    this.musicTracks = /* @__PURE__ */ new Map();
    this.youtubeVideos = /* @__PURE__ */ new Map();
    this.galleryImages = /* @__PURE__ */ new Map();
    this.events = /* @__PURE__ */ new Map();
  }
  // Contacts
  async getContact(id) {
    return this.contacts.get(id);
  }
  async getAllContacts() {
    return Array.from(this.contacts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async createContact(insertContact) {
    const id = randomUUID();
    const contact = {
      ...insertContact,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
  // Admin authentication
  async getAdminByUsername(username) {
    return Array.from(this.admins.values()).find((admin) => admin.username === username);
  }
  async createAdmin(insertAdmin) {
    const id = randomUUID();
    const admin = {
      ...insertAdmin,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.admins.set(id, admin);
    return admin;
  }
  // Music tracks
  async getAllMusicTracks() {
    return Array.from(this.musicTracks.values()).filter((track) => track.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
  }
  async getMusicTrack(id) {
    return this.musicTracks.get(id);
  }
  async createMusicTrack(insertTrack) {
    const id = randomUUID();
    const track = {
      artist: "Prabhat Yadav",
      spotifyId: null,
      youtubeId: null,
      description: null,
      duration: null,
      releaseDate: null,
      isActive: true,
      sortOrder: 0,
      ...insertTrack,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.musicTracks.set(id, track);
    return track;
  }
  async updateMusicTrack(id, updateData) {
    const existing = this.musicTracks.get(id);
    if (!existing) return void 0;
    const updated = {
      ...existing,
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.musicTracks.set(id, updated);
    return updated;
  }
  async deleteMusicTrack(id) {
    return this.musicTracks.delete(id);
  }
  // YouTube videos
  async getAllYoutubeVideos() {
    return Array.from(this.youtubeVideos.values()).filter((video) => video.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
  }
  async getYoutubeVideo(id) {
    return this.youtubeVideos.get(id);
  }
  async createYoutubeVideo(insertVideo) {
    const id = randomUUID();
    const video = {
      description: null,
      thumbnail: null,
      category: "Music",
      isActive: true,
      sortOrder: 0,
      ...insertVideo,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.youtubeVideos.set(id, video);
    return video;
  }
  async updateYoutubeVideo(id, updateData) {
    const existing = this.youtubeVideos.get(id);
    if (!existing) return void 0;
    const updated = {
      ...existing,
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.youtubeVideos.set(id, updated);
    return updated;
  }
  async deleteYoutubeVideo(id) {
    return this.youtubeVideos.delete(id);
  }
  // Gallery images
  async getAllGalleryImages() {
    return Array.from(this.galleryImages.values()).filter((image) => image.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
  }
  async getGalleryImage(id) {
    return this.galleryImages.get(id);
  }
  async createGalleryImage(insertImage) {
    const id = randomUUID();
    const image = {
      category: "Performance",
      isActive: true,
      sortOrder: 0,
      ...insertImage,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.galleryImages.set(id, image);
    return image;
  }
  async updateGalleryImage(id, updateData) {
    const existing = this.galleryImages.get(id);
    if (!existing) return void 0;
    const updated = {
      ...existing,
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.galleryImages.set(id, updated);
    return updated;
  }
  async deleteGalleryImage(id) {
    return this.galleryImages.delete(id);
  }
  // Events
  async getAllEvents() {
    return Array.from(this.events.values()).filter((event) => event.isActive).sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  }
  async getEvent(id) {
    return this.events.get(id);
  }
  async createEvent(insertEvent) {
    const id = randomUUID();
    const event = {
      description: null,
      address: null,
      ticketUrl: null,
      price: null,
      isActive: true,
      ...insertEvent,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.events.set(id, event);
    return event;
  }
  async updateEvent(id, updateData) {
    const existing = this.events.get(id);
    if (!existing) return void 0;
    const updated = {
      ...existing,
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.events.set(id, updated);
    return updated;
  }
  async deleteEvent(id) {
    return this.events.delete(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  message: true
}).extend({
  recaptchaToken: z.string().min(1, "Please complete the reCAPTCHA verification")
});
var insertContactStorageSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  message: true
});
var admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var musicTracks = pgTable("music_tracks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  artist: text("artist").notNull().default("Prabhat Yadav"),
  language: text("language").notNull(),
  // Hindi, Bhojpuri, Nepali
  spotifyId: text("spotify_id"),
  // Spotify track ID for embedding
  youtubeId: text("youtube_id"),
  // YouTube video ID
  description: text("description"),
  duration: integer("duration"),
  // duration in seconds
  releaseDate: timestamp("release_date"),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var youtubeVideos = pgTable("youtube_videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  youtubeId: text("youtube_id").notNull().unique(),
  description: text("description"),
  thumbnail: text("thumbnail"),
  // YouTube thumbnail URL
  category: text("category").notNull().default("Music"),
  // Music, Performance, Interview, etc.
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var galleryImages = pgTable("gallery_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  alt: text("alt").notNull(),
  category: text("category").notNull().default("Performance"),
  // Performance, Studio, Portrait, etc.
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  venue: text("venue").notNull(),
  address: text("address"),
  eventDate: timestamp("event_date").notNull(),
  ticketUrl: text("ticket_url"),
  price: text("price"),
  // Free, $20, etc.
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertAdminSchema = createInsertSchema(admins).pick({
  username: true,
  passwordHash: true
});
var insertMusicTrackSchema = createInsertSchema(musicTracks).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertYoutubeVideoSchema = createInsertSchema(youtubeVideos).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertGalleryImageSchema = createInsertSchema(galleryImages).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

// server/routes.ts
import { z as z2 } from "zod";

// server/auth.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
var JWT_SECRET = process.env.JWT_SECRET || (() => {
  if (process.env.NODE_ENV === "production") {
    console.error("ERROR: JWT_SECRET environment variable is required for production");
    process.exit(1);
  }
  return crypto.randomBytes(64).toString("hex");
})();
var SALT_ROUNDS = 10;
async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
function generateToken(admin) {
  return jwt.sign(
    { id: admin.id, username: admin.username },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
}
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}
function createDefaultAdmin() {
  if (process.env.NODE_ENV === "production") {
    const username = process.env.DEFAULT_ADMIN_USERNAME;
    const password = process.env.DEFAULT_ADMIN_PASSWORD;
    if (!username || !password) {
      console.error("ERROR: DEFAULT_ADMIN_USERNAME and DEFAULT_ADMIN_PASSWORD must be set in production");
      process.exit(1);
    }
    if (password.length < 8) {
      console.error("ERROR: DEFAULT_ADMIN_PASSWORD must be at least 8 characters long");
      process.exit(1);
    }
    return { username, password };
  }
  return {
    username: process.env.DEFAULT_ADMIN_USERNAME || "admin",
    password: process.env.DEFAULT_ADMIN_PASSWORD || "admin123"
  };
}

// server/routes.ts
async function verifyRecaptcha(token) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn("RECAPTCHA_SECRET_KEY is not configured - bypassing in development");
        return true;
      }
      console.error("RECAPTCHA_SECRET_KEY is not configured");
      return false;
    }
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `secret=${secretKey}&response=${token}`
    });
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
  req.admin = decoded;
  next();
}
async function registerRoutes(app2) {
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
  app2.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const isValidRecaptcha = await verifyRecaptcha(contactData.recaptchaToken);
      if (!isValidRecaptcha) {
        res.status(400).json({
          message: "reCAPTCHA verification failed. Please try again."
        });
        return;
      }
      const { recaptchaToken, ...contactToStore } = contactData;
      const contact = await storage.createContact(contactToStore);
      res.json({
        success: true,
        message: "Message sent successfully!",
        contact
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
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
  app2.get("/api/music-tracks", async (req, res) => {
    try {
      const tracks = await storage.getAllMusicTracks();
      res.json(tracks);
    } catch (error) {
      console.error("Error fetching music tracks:", error);
      res.status(500).json({ message: "Failed to fetch music tracks" });
    }
  });
  app2.get("/api/youtube-videos", async (req, res) => {
    try {
      const videos = await storage.getAllYoutubeVideos();
      res.json(videos);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      res.status(500).json({ message: "Failed to fetch YouTube videos" });
    }
  });
  app2.get("/api/gallery-images", async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json(images);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });
  app2.get("/api/events", async (req, res) => {
    try {
      const events2 = await storage.getAllEvents();
      res.json(events2);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  app2.post("/api/admin/login", async (req, res) => {
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
      if (error instanceof z2.ZodError) {
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
  app2.get("/api/admin/contacts", requireAuth, async (req, res) => {
    try {
      const contacts2 = await storage.getAllContacts();
      res.json(contacts2);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });
  app2.post("/api/admin/music-tracks", requireAuth, async (req, res) => {
    try {
      const trackData = insertMusicTrackSchema.parse(req.body);
      const track = await storage.createMusicTrack(trackData);
      res.json(track);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid track data", errors: error.errors });
      } else {
        console.error("Error creating music track:", error);
        res.status(500).json({ message: "Failed to create music track" });
      }
    }
  });
  app2.put("/api/admin/music-tracks/:id", requireAuth, async (req, res) => {
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
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid track data", errors: error.errors });
      } else {
        console.error("Error updating music track:", error);
        res.status(500).json({ message: "Failed to update music track" });
      }
    }
  });
  app2.delete("/api/admin/music-tracks/:id", requireAuth, async (req, res) => {
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
  app2.post("/api/admin/youtube-videos", requireAuth, async (req, res) => {
    try {
      const videoData = insertYoutubeVideoSchema.parse(req.body);
      const video = await storage.createYoutubeVideo(videoData);
      res.json(video);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid video data", errors: error.errors });
      } else {
        console.error("Error creating YouTube video:", error);
        res.status(500).json({ message: "Failed to create YouTube video" });
      }
    }
  });
  app2.put("/api/admin/youtube-videos/:id", requireAuth, async (req, res) => {
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
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid video data", errors: error.errors });
      } else {
        console.error("Error updating YouTube video:", error);
        res.status(500).json({ message: "Failed to update YouTube video" });
      }
    }
  });
  app2.delete("/api/admin/youtube-videos/:id", requireAuth, async (req, res) => {
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
  app2.post("/api/admin/gallery-images", requireAuth, async (req, res) => {
    try {
      const imageData = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(imageData);
      res.json(image);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid image data", errors: error.errors });
      } else {
        console.error("Error creating gallery image:", error);
        res.status(500).json({ message: "Failed to create gallery image" });
      }
    }
  });
  app2.put("/api/admin/gallery-images/:id", requireAuth, async (req, res) => {
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
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid image data", errors: error.errors });
      } else {
        console.error("Error updating gallery image:", error);
        res.status(500).json({ message: "Failed to update gallery image" });
      }
    }
  });
  app2.delete("/api/admin/gallery-images/:id", requireAuth, async (req, res) => {
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
  app2.post("/api/admin/events", requireAuth, async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.json(event);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid event data", errors: error.errors });
      } else {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Failed to create event" });
      }
    }
  });
  app2.put("/api/admin/events/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = insertEventSchema.partial().parse(req.body);
      const event = await storage.updateEvent(id, updateData);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.json(event);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ message: "Invalid event data", errors: error.errors });
      } else {
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Failed to update event" });
      }
    }
  });
  app2.delete("/api/admin/events/:id", requireAuth, async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
