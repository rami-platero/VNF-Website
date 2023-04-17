import { Router } from "express";
import {
  getBackground,
  getBackgrounds,
  postBackground,
  putBackground,
  delBackground,
} from "../controllers/bgsController.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";

export const bgRouter = Router();

bgRouter.get("/backgrounds", getBackgrounds);
bgRouter.post("/backgrounds", verifyToken, isAdmin, postBackground);
bgRouter.get("/backgrounds/:id", getBackground);
bgRouter.put("/backgrounds/:id", verifyToken, isAdmin, putBackground);
bgRouter.delete("/backgrounds/:id", verifyToken, isAdmin, delBackground);
