import { Router } from "express";
import {
  deleteSong,
  getSong,
  getSongs,
  newSong,
  updateSong,
} from "../controllers/songsController.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";

export const router = Router();

router.get("/songs", getSongs);
router.post("/songs", verifyToken, newSong);
router.get("/songs/:id", getSong);
router.delete("/songs/:id", verifyToken, isAdmin , deleteSong);
router.put("/songs/:id", verifyToken, updateSong); 
