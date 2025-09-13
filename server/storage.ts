import { 
  type Contact, 
  type InsertContactStorage,
  type Admin,
  type InsertAdmin,
  type MusicTrack,
  type InsertMusicTrack,
  type YoutubeVideo,
  type InsertYoutubeVideo,
  type GalleryImage,
  type InsertGalleryImage,
  type Event,
  type InsertEvent
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Contacts
  getContact(id: string): Promise<Contact | undefined>;
  getAllContacts(): Promise<Contact[]>;
  createContact(contact: InsertContactStorage): Promise<Contact>;
  
  // Admin authentication
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  
  // Music tracks
  getAllMusicTracks(): Promise<MusicTrack[]>;
  getMusicTrack(id: string): Promise<MusicTrack | undefined>;
  createMusicTrack(track: InsertMusicTrack): Promise<MusicTrack>;
  updateMusicTrack(id: string, track: Partial<InsertMusicTrack>): Promise<MusicTrack | undefined>;
  deleteMusicTrack(id: string): Promise<boolean>;
  
  // YouTube videos
  getAllYoutubeVideos(): Promise<YoutubeVideo[]>;
  getYoutubeVideo(id: string): Promise<YoutubeVideo | undefined>;
  createYoutubeVideo(video: InsertYoutubeVideo): Promise<YoutubeVideo>;
  updateYoutubeVideo(id: string, video: Partial<InsertYoutubeVideo>): Promise<YoutubeVideo | undefined>;
  deleteYoutubeVideo(id: string): Promise<boolean>;
  
  // Gallery images
  getAllGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImage(id: string): Promise<GalleryImage | undefined>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: string, image: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined>;
  deleteGalleryImage(id: string): Promise<boolean>;
  
  // Events
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private contacts: Map<string, Contact>;
  private admins: Map<string, Admin>;
  private musicTracks: Map<string, MusicTrack>;
  private youtubeVideos: Map<string, YoutubeVideo>;
  private galleryImages: Map<string, GalleryImage>;
  private events: Map<string, Event>;

  constructor() {
    this.contacts = new Map();
    this.admins = new Map();
    this.musicTracks = new Map();
    this.youtubeVideos = new Map();
    this.galleryImages = new Map();
    this.events = new Map();
  }

  // Contacts
  async getContact(id: string): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createContact(insertContact: InsertContactStorage): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  // Admin authentication
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(admin => admin.username === username);
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = randomUUID();
    const admin: Admin = {
      ...insertAdmin,
      id,
      createdAt: new Date()
    };
    this.admins.set(id, admin);
    return admin;
  }

  // Music tracks
  async getAllMusicTracks(): Promise<MusicTrack[]> {
    return Array.from(this.musicTracks.values())
      .filter(track => track.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getMusicTrack(id: string): Promise<MusicTrack | undefined> {
    return this.musicTracks.get(id);
  }

  async createMusicTrack(insertTrack: InsertMusicTrack): Promise<MusicTrack> {
    const id = randomUUID();
    const track: MusicTrack = {
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
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.musicTracks.set(id, track);
    return track;
  }

  async updateMusicTrack(id: string, updateData: Partial<InsertMusicTrack>): Promise<MusicTrack | undefined> {
    const existing = this.musicTracks.get(id);
    if (!existing) return undefined;
    
    const updated: MusicTrack = {
      ...existing,
      ...updateData,
      updatedAt: new Date()
    };
    this.musicTracks.set(id, updated);
    return updated;
  }

  async deleteMusicTrack(id: string): Promise<boolean> {
    return this.musicTracks.delete(id);
  }

  // YouTube videos
  async getAllYoutubeVideos(): Promise<YoutubeVideo[]> {
    return Array.from(this.youtubeVideos.values())
      .filter(video => video.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getYoutubeVideo(id: string): Promise<YoutubeVideo | undefined> {
    return this.youtubeVideos.get(id);
  }

  async createYoutubeVideo(insertVideo: InsertYoutubeVideo): Promise<YoutubeVideo> {
    const id = randomUUID();
    const video: YoutubeVideo = {
      description: null,
      thumbnail: null,
      category: "Music",
      isActive: true,
      sortOrder: 0,
      ...insertVideo,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.youtubeVideos.set(id, video);
    return video;
  }

  async updateYoutubeVideo(id: string, updateData: Partial<InsertYoutubeVideo>): Promise<YoutubeVideo | undefined> {
    const existing = this.youtubeVideos.get(id);
    if (!existing) return undefined;
    
    const updated: YoutubeVideo = {
      ...existing,
      ...updateData,
      updatedAt: new Date()
    };
    this.youtubeVideos.set(id, updated);
    return updated;
  }

  async deleteYoutubeVideo(id: string): Promise<boolean> {
    return this.youtubeVideos.delete(id);
  }

  // Gallery images
  async getAllGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values())
      .filter(image => image.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getGalleryImage(id: string): Promise<GalleryImage | undefined> {
    return this.galleryImages.get(id);
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = randomUUID();
    const image: GalleryImage = {
      category: "Performance",
      isActive: true,
      sortOrder: 0,
      ...insertImage,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.galleryImages.set(id, image);
    return image;
  }

  async updateGalleryImage(id: string, updateData: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined> {
    const existing = this.galleryImages.get(id);
    if (!existing) return undefined;
    
    const updated: GalleryImage = {
      ...existing,
      ...updateData,
      updatedAt: new Date()
    };
    this.galleryImages.set(id, updated);
    return updated;
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    return this.galleryImages.delete(id);
  }

  // Events
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values())
      .filter(event => event.isActive)
      .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = {
      description: null,
      address: null,
      ticketUrl: null,
      price: null,
      isActive: true,
      ...insertEvent,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: string, updateData: Partial<InsertEvent>): Promise<Event | undefined> {
    const existing = this.events.get(id);
    if (!existing) return undefined;
    
    const updated: Event = {
      ...existing,
      ...updateData,
      updatedAt: new Date()
    };
    this.events.set(id, updated);
    return updated;
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.events.delete(id);
  }
}

export const storage = new MemStorage();
