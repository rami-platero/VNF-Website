import { Router } from "express";
import {
  deleteSong,
  getSong,
  getSongs,
  newSong,
  updateSong,
} from "../controllers/songsController.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingBG } from "../middlewares/existingBG.js";
import { validateSong } from "../middlewares/validations.js";

export const router = Router();

router.get("/songs", getSongs);
router.post("/songs", verifyToken, isAdmin, validateSong, checkExistingBG, newSong);
router.get("/songs/:id", getSong);
router.delete("/songs/:id", verifyToken, isAdmin , deleteSong);
router.put("/songs/:id", verifyToken, updateSong); 
