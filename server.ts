import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { handleReviewProtocol } from "./api/review-protocol.ts";
import { handleTroubleshootExperiment } from "./api/troubleshoot-experiment.ts";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "2mb" }));

// API endpoint for Protocol Review via Gemini AI
app.post("/api/review-protocol", async (req, res) => {
  try {
    const result = await handleReviewProtocol(req.body);
    return res.json({ success: true, result });
  } catch (err: any) {
    console.error("Error in /api/review-protocol:", err);
    const status = typeof err === 'object' && err?.status ? err.status : 500;
    return res.status(status).json({ 
      error: err?.message || err || "An unexpected error occurred while analyzing the protocol with Gemini AI."
    });
  }
});

// API endpoint for Experiment Troubleshooting via Gemini AI
app.post("/api/troubleshoot-experiment", async (req, res) => {
  try {
    const result = await handleTroubleshootExperiment(req.body);
    return res.json({ success: true, result });
  } catch (err: any) {
    console.error("Error in /api/troubleshoot-experiment:", err);
    const status = typeof err === 'object' && err?.status ? err.status : 500;
    return res.status(status).json({ 
      error: err?.message || err || "An unexpected error occurred while analyzing the experiment failure with Gemini AI."
    });
  }
});

// Start Express server with Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BenchWise Server running on http://localhost:${PORT}`);
  });
}

startServer();
