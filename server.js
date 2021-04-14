import express from "express";
import cors from "cors";
import userRoutes from "./userRoutes";
import uploadRoutes from "./uploadRoutes";
import postRoutes from "./postRoutes";
import "dotenv/config";
import { connect } from "mongoose";
import likeUnlikeRoutes from "./likeUnlikeRoutes";
import categoryRoutes from "./categoryRoutes";
import commentRoutes from "./commentRoutes";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";

connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to database");
});
const logFile = fs.createWriteStream(path.join(__dirname, "logFile.log"), {
  flags: "a",
});
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(require("body-parser").json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev", { stream: logFile }));

// user authantication routes
// public routes
app.get("/", (req, res) => {
  res.cookie("jwtToken", "this is a example");
  console.log(req);
  return res.json({ ok: "ok" });
});
app.use("/auth", userRoutes);
// images
app.use("/upload", uploadRoutes);
// authenticated routes
// middleware to check that req has user or not
app.use((req, res, next) => {
  console.log(req.body);
  if (!req.body.userId) {
    res.status(400).json({ errors: "Bad Requst" });
  } else {
    next();
  }
});
app.use("/post", postRoutes);
app.use("/like", likeUnlikeRoutes);

app.use("/category", categoryRoutes);
app.use("/comment", commentRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Pet Social backend.......");
});
