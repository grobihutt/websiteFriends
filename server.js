import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// Proxy route
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

// Render provides PORT via env variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy running on port ${port}`));
