HelioHost Deployment Guide
This guide will help you deploy your Prabhat Yadav portfolio website to HelioHost.org using Phusion Passenger.

Files Required for Deployment
Upload these files and folders to your HelioHost domain's public_html folder:

Essential Files
app.js - Main application entry point for Passenger
package.json - Dependencies and configuration
dist/ folder - Built application (frontend and backend)
shared/ folder - Shared schema and types
Optional Files
node_modules/ - Dependencies (will be auto-installed if missing)
.npmrc - npm configuration (if you have custom npm settings)
Step-by-Step Deployment Instructions
1. Build Your Application
Before uploading, make sure to build your application:

npm run build
2. Upload Files to HelioHost
Upload the following structure to your domain's public_html folder:

public_html/
├── app.js
├── package.json
├── dist/
│   ├── index.js
│   └── public/
├── shared/
└── node_modules/ (optional - will be created automatically)
3. Configure Node.js in cPanel
Log into your HelioHost cPanel
Go to the "Node.js" section
Click "Create Application"
Set the following:
Application Mode: Development (for initial setup to see detailed errors)
Application Root: /public_html (or your domain folder)
Application Startup File: app.js
Node.js Version: Latest available (14+ recommended)
4. Environment Variables (Optional but Recommended)
In the Node.js app settings, add these environment variables for better security:

JWT_SECRET: A strong random string for JWT token signing
NODE_ENV: production
5. Install Dependencies
Your dependencies should install automatically, but if needed:

Go to cPanel File Manager
Navigate to your domain folder
Use Terminal or wait for automatic installation
6. Test Your Application
Visit your domain
If you see errors, check:
Error Logs in cPanel
Switch Application Mode to "Development" to see detailed errors
Ensure all files are uploaded correctly
7. Switch to Production Mode
Once everything works:

Change Application Mode from "Development" to "Production"
Restart the application
Wait up to 2 hours for changes to take effect
Troubleshooting
Common Issues
"Web application could not be started"

Check that app.js exists and is executable
Verify Node.js version compatibility
Switch to Development mode for detailed errors
Missing Dependencies

Upload package.json
Wait for automatic npm install or run manually
Port Issues

The app.js file handles port configuration automatically
Passenger will assign the correct port
File Permissions

Ensure files have correct permissions (644 for files, 755 for directories)
Getting Help
Check HelioHost forums for common issues
Use Development mode to see detailed error messages
Contact HelioHost support with your Error ID if needed
Important Notes
Changes can take up to 2 hours to propagate
Always test in Development mode first
Keep your JWT_SECRET secure in production
The application includes all necessary admin functionality for managing content