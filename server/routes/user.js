import { Router } from "express";
export const routerAuth = Router();
import { loginUser, signupUser } from "../controllers/userController.js";

//LOGIN
routerAuth.post("/login", loginUser)
//SIGN UP
routerAuth.post("/signup", signupUser)