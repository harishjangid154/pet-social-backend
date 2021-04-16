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
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

//----------------------------------------------END OF IMPORT-----------------------------------------------------

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
app.use(express.json());
app.use(require("body-parser").json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(morgan("dev", { stream: logFile }));

app.use(cookieParser());

//----------------------------------------------END OF MIDDLEWARES-----------------------------------------------------

/* app.get("/", (req, res) => {
  res.cookie("harish", "test", { maxAge: 2 * 1000 });
  res.send("done");
}); */

// user authantication routes
// public routes
app.use("/auth", userRoutes);
// images
app.use("/upload", uploadRoutes);

// authenticated routes
// middleware to check that req has user or not
const chekAuth = (req, res, next) => {
  const userToken = req.cookies["jwt-token"];
  const user = jwt.decode(userToken);
  if (!user._id) {
    res.status(400).json({ errors: "Bad Requst" });
  } else {
    req.body.userId = user._id;
    console.log(req.body);
    next();
  }
};
app.use("/post", chekAuth, postRoutes);
app.use("/like", chekAuth, likeUnlikeRoutes);
app.use("/category", chekAuth, categoryRoutes);
app.use("/comment", chekAuth, commentRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Pet Social backend.......");
});
