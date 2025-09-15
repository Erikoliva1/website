import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(1, "Message is required"),
  recaptchaToken: z.string().default(""),
});

// Type for storage - without recaptchaToken (only used for verification)
export const insertContactStorageSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  message: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertContactStorage = z.infer<typeof insertContactStorageSchema>;
export type Contact = typeof contacts.$inferSelect;

// Admin authentication
export const admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Music tracks
export const musicTracks = pgTable("music_tracks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  artist: text("artist").notNull().default("Prabhat Yadav"),
  language: text("language").notNull(), // Hindi, Bhojpuri, Nepali
  spotifyId: text("spotify_id"), // Spotify track ID for embedding
  youtubeId: text("youtube_id"), // YouTube video ID
  description: text("description"),
  duration: integer("duration"), // duration in seconds
  releaseDate: timestamp("release_date"),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// YouTube videos
export const youtubeVideos = pgTable("youtube_videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  youtubeId: text("youtube_id").notNull().unique(),
  description: text("description"),
  thumbnail: text("thumbnail"), // YouTube thumbnail URL
  category: text("category").notNull().default("Music"), // Music, Performance, Interview, etc.
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Gallery images
export const galleryImages = pgTable("gallery_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  alt: text("alt").notNull(),
  category: text("category").notNull().default("Performance"), // Performance, Studio, Portrait, etc.
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Events
export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  venue: text("venue").notNull(),
  address: text("address").notNull(),
  eventDate: timestamp("event_date").notNull(),
  ticketUrl: text("ticket_url"),
  price: text("price"), // Free, $20, etc.
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Insert schemas
export const insertAdminSchema = createInsertSchema(admins).pick({
  username: true,
  passwordHash: true,
});

export const insertMusicTrackSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  language: z.string().min(1, "Language is required"),
  spotifyId: z.string().min(1, "Spotify ID is required"),
  youtubeId: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().optional(),
  releaseDate: z.date().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const insertYoutubeVideoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  youtubeId: z.string().min(1, "YouTube ID is required"),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  category: z.string().default("Music"),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const insertGalleryImageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  alt: z.string().min(1, "Alt text is required"),
  category: z.string().default("Performance"),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const insertEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  venue: z.string().min(1, "Venue is required"),
  address: z.string().min(1, "Address is required"),
  eventDate: z.coerce.date(),
  ticketUrl: z.string().optional(),
  price: z.string().optional(),
  isActive: z.boolean().default(true),
});

// Admin login schema
export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Types
export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;

export type MusicTrack = typeof musicTracks.$inferSelect;
export type InsertMusicTrack = z.infer<typeof insertMusicTrackSchema>;

export type YoutubeVideo = typeof youtubeVideos.$inferSelect;
export type InsertYoutubeVideo = z.infer<typeof insertYoutubeVideoSchema>;

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;