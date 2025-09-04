import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the HTML file at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API proxy route
app.get("/api/*", async (req, res) => {
  try {
    const target = req.params[0]; // everything after /api/
    const url = `https://${target}?${new URLSearchParams(req.query)}`;
    const response = await fetch(url, { headers: { "Accept": "application/json" } });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch-all route serves the HTML (optional for SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
