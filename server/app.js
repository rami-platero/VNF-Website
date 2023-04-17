import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { router } from "./routes/songs.js";
import fileUpload from "express-fileupload";
import { routerAuth } from "./routes/user.js";
import { createRoles } from "./libs/initialSetup.js";
import { bgRouter } from "./routes/backgrounds.js";

const app = express();
createRoles();

//SETTINGS
app.set("port", process.env.PORT);
//MIDDLEWARES
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//REST
app.use("/", router, routerAuth, bgRouter);
app.get("/", (req,res)=>{
  res.setHeader("Access-Control-Allow-Credentials","true")
})

export default app;
