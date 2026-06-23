import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import songsRouter from "./routes/songs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const ALLOWED_ORIGINS = FRONTEND_ORIGIN.split(",").map((origin) =>
  origin.trim(),
);

app.disable("x-powered-by");
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 400,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS blocked"));
    },
  }),
);
app.use(express.json());

app.use("/api/songs", songsRouter);

app.use("/media/songs", express.static(path.resolve(__dirname, "../../Songs")));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Spotify backend running on http://localhost:${PORT}`);
});
