#!/usr/bin/env node

// HelioHost Passenger-compatible entry point
// Sets up the environment and starts the ESM application

// Set production environment for Passenger
process.env.NODE_ENV = 'production';

// Passenger expects the app to handle its own port
if (!process.env.PORT) {
  process.env.PORT = '3000';
}

// CRITICAL: Validate required environment variables in production
console.log('🔒 Validating production environment variables...');

const requiredVars = [
  'JWT_SECRET', 
  'VITE_RECAPTCHA_SITE_KEY', 
  'RECAPTCHA_SECRET_KEY',
  'DEFAULT_ADMIN_USERNAME',
  'DEFAULT_ADMIN_PASSWORD'
];

const missing = requiredVars.filter(varName => !process.env[varName]);

if (missing.length > 0) {
  console.error('🚨 FATAL: Required environment variables missing in production:');
  console.error('Missing variables:', missing.join(', '));
  console.error('');
  console.error('Please set these variables in your HelioHost cPanel Node.js Environment:');
  console.error('- JWT_SECRET: A strong random secret (64+ characters)');
  console.error('- VITE_RECAPTCHA_SITE_KEY: Your Google reCAPTCHA site key');
  console.error('- RECAPTCHA_SECRET_KEY: Your Google reCAPTCHA secret key');  
  console.error('- DEFAULT_ADMIN_USERNAME: Your admin username (not "admin")');
  console.error('- DEFAULT_ADMIN_PASSWORD: Strong password (12+ characters)');
  console.error('');
  console.error('🔐 Security: No default credentials are provided for production deployment.');
  process.exit(1);
}

// Validate admin password strength
const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
if (adminPassword === 'admin123' || adminPassword === 'password' || adminPassword.length < 12) {
  console.error('🚨 FATAL: DEFAULT_ADMIN_PASSWORD is too weak for production!');
  console.error('Password must be at least 12 characters and not a common default.');
  console.error('Please set a strong password in your environment variables.');
  process.exit(1);
}

// Validate JWT secret strength  
const jwtSecret = process.env.JWT_SECRET;
if (jwtSecret.includes('change-this') || jwtSecret.length < 32) {
  console.error('🚨 FATAL: JWT_SECRET is too weak for production!');
  console.error('JWT secret must be at least 32 characters and cryptographically random.');
  console.error('Generate a strong secret: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"');
  process.exit(1);
}

console.log('✅ Production environment validation passed - all required variables set securely.');

// Import the built ESM application
import('./dist/index.js')
  .then(() => {
    console.log('Application started successfully for Passenger on port', process.env.PORT);
  })
  .catch((err) => {
    console.error('Failed to start application:', err);
    console.error('Error details:', err.stack);
    process.exit(1);
  });