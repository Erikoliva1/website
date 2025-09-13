import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { type Admin } from "@shared/schema";

const JWT_SECRET = process.env.JWT_SECRET || (() => {
  if (process.env.NODE_ENV === 'production') {
    console.error('ERROR: JWT_SECRET environment variable is required for production');
    process.exit(1);
  }
  // Generate a random secret for development
  return crypto.randomBytes(64).toString('hex');
})();
const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(admin: Admin): string {
  return jwt.sign(
    { id: admin.id, username: admin.username },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
}

export function verifyToken(token: string): { id: string; username: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; username: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export function createDefaultAdmin() {
  // Only allow default admin creation with proper configuration
  if (process.env.NODE_ENV === 'production') {
    const username = process.env.DEFAULT_ADMIN_USERNAME;
    const password = process.env.DEFAULT_ADMIN_PASSWORD;
    
    if (!username || !password) {
      console.error('ERROR: DEFAULT_ADMIN_USERNAME and DEFAULT_ADMIN_PASSWORD must be set in production');
      process.exit(1);
    }
    
    if (password.length < 8) {
      console.error('ERROR: DEFAULT_ADMIN_PASSWORD must be at least 8 characters long');
      process.exit(1);
    }
    
    return { username, password };
  }
  
  // Development fallback with secure defaults
  return {
    username: process.env.DEFAULT_ADMIN_USERNAME || "admin",
    password: process.env.DEFAULT_ADMIN_PASSWORD || "admin123"
  };
}