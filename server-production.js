import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the dist/public directory
app.use(express.static(path.join(__dirname, "dist/public")));

// Basic API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve index.html for all other routes (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🎵 Prabhat Music Website running on port ${PORT}`);
});
