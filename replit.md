Overview
This is a full-stack web application for a musician's portfolio website featuring Prabhat Yadav, a singer who performs in Hindi, Bhojpuri, and Nepali languages. The application showcases the artist's music, biography, upcoming events, photo gallery, and provides a contact form for audience engagement. Built as a modern single-page application with a REST API backend, it emphasizes visual appeal and user experience through animations, responsive design, and interactive components.

User Preferences
Preferred communication style: Simple, everyday language.

System Architecture
Frontend Architecture
Framework: React 18 with TypeScript using Vite as the build tool
UI Library: Shadcn/ui components built on top of Radix UI primitives
Styling: Tailwind CSS with custom CSS variables for theming
State Management: TanStack Query (React Query) for server state management
Routing: Wouter for lightweight client-side routing
Form Handling: React Hook Form with Zod validation
Animations: CSS-based animations with parallax effects and smooth scrolling
The frontend follows a component-based architecture with reusable UI components organized in a /components/ui directory. The main application features sections for hero, about, music, events, gallery, and contact, all rendered as a single-page application.

Backend Architecture
Framework: Express.js with TypeScript running on Node.js
API Design: RESTful API with JSON responses
Data Storage: In-memory storage using a Map-based implementation (MemStorage class)
Request Handling: JSON parsing middleware with custom logging for API requests
Error Handling: Centralized error handling with proper HTTP status codes
Development Server: Vite integration for hot module replacement in development
The backend implements a simple storage interface (IStorage) allowing for easy switching between storage implementations. Currently uses memory storage but designed to support database integration.

Data Storage Solutions
Current Implementation: In-memory storage using JavaScript Maps
Schema Definition: Drizzle ORM schema with PostgreSQL dialect for future database integration
Data Validation: Zod schemas for runtime type checking and validation
Migration Support: Drizzle-kit configured for database migrations when transitioning to persistent storage
The contact form data is currently stored in memory but the schema is prepared for PostgreSQL deployment with proper table definitions and constraints.

Authentication and Authorization
Current State: No authentication system implemented
Session Management: Connect-pg-simple package included for future PostgreSQL session storage
API Security: Basic request validation through Zod schemas
Development and Build Process
Build System: Vite for frontend bundling with esbuild for server bundling
Type Safety: Full TypeScript implementation across frontend and backend
Development Experience: Hot reload, runtime error overlay, and development-specific tooling
Path Resolution: Configured aliases for clean imports (@/ for client, @shared/ for shared code)
External Dependencies
UI and Styling Dependencies
Radix UI: Comprehensive set of unstyled, accessible UI primitives
Tailwind CSS: Utility-first CSS framework with PostCSS processing
Lucide React: Icon library for consistent iconography
React Icons: Additional icon sets including social media icons
Embla Carousel: Carousel/slider functionality for gallery components
Backend and Database Dependencies
Neon Database: Serverless PostgreSQL database service (configured but not actively used)
Drizzle ORM: Type-safe ORM with PostgreSQL support
Express.js: Web framework for API endpoints and middleware
Development and Build Tools
Vite: Frontend build tool and development server
ESBuild: Fast JavaScript bundler for production builds
TypeScript: Static type checking across the entire application
Replit Integration: Custom plugins for Replit development environment
Form and Validation Libraries
React Hook Form: Performant form library with minimal re-renders
Zod: Schema validation library for runtime type checking
Hookform Resolvers: Integration between React Hook Form and Zod
State Management and Data Fetching
TanStack Query: Server state management with caching and synchronization
Date-fns: Date utility library for time-related operations
The application is designed with scalability in mind, using established patterns and libraries that support growth from the current memory-based storage to full database-backed persistence.