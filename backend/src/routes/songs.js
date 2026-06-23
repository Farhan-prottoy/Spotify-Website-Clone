import { Router } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

const songsRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const songsPath = path.resolve(__dirname, "../data/songs.json");

songsRouter.get("/", async (_req, res) => {
  try {
    const fileContent = await fs.readFile(songsPath, "utf-8");
    const songs = JSON.parse(fileContent);
    res.status(200).json(songs);
  } catch {
    res.status(500).json({ message: "Unable to load songs" });
  }
});

export default songsRouter;
