HelioHost Deployment Checklist
✅ Pre-Deployment (Complete)
 Built production version (npm run build)
 Created Passenger-compatible app.js
 Set up environment variables in app.js
 Tested local startup (working correctly)
📁 Files to Upload to HelioHost
Upload these files/folders to your domain's public_html folder:

Required Files:
public_html/
├── app.js                    ← Main Passenger entry point
├── package.json              ← Dependencies and metadata  
├── dist/                     ← Built application
│   ├── index.js             ← Server bundle
│   └── public/              ← Frontend files
│       ├── index.html
│       └── assets/
├── shared/                   ← Schema definitions
│   └── schema.ts
└── node_modules/             ← Auto-installed by HelioHost
🚀 Deployment Steps
1. Upload Files
Upload app.js, package.json, dist/, and shared/ folders to your domain's public_html
2. HelioHost cPanel Configuration
Node.js Section → Create Application:
Application Root: /public_html (or your domain folder)
Application Startup File: app.js
Application Mode: Development (initially)
Node.js Version: Latest available
3. Test & Switch to Production
Visit your domain - should work immediately
Admin panel: Login with the secure credentials you set in environment variables
Once confirmed working, switch to Production mode
Wait up to 2 hours for full propagation
🔧 Production Configuration
Your application requires these environment variables in HelioHost cPanel:

Required Environment Variables:
JWT_SECRET: Strong random secret (64+ chars) - Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
DEFAULT_ADMIN_USERNAME: Your admin username (NOT "admin")
DEFAULT_ADMIN_PASSWORD: Strong password (12+ characters minimum)
VITE_RECAPTCHA_SITE_KEY: Your Google reCAPTCHA site key
RECAPTCHA_SECRET_KEY: Your Google reCAPTCHA secret key
Security Features:
No hardcoded secrets: All sensitive data must be in environment variables
Strong password validation: Weak passwords like "admin123" are rejected
JWT secret validation: Ensures cryptographically secure secrets
Production-ready: Fails fast if security requirements aren't met
🚨 Security Notes
Change admin password after first login
Consider setting custom JWT_SECRET in cPanel environment variables
Application data resets on server restart (as designed)
✅ Ready to Deploy!
Your application is now fully prepared for HelioHost deployment with all admin panel functionality working.