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
import passport from "passport";
import initializePassport from "./passport/passport-config";
import session from "express-session";
import userModel from "./dbSchema/userModel";

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

// app.use(cors());
app.use(morgan("dev", { stream: logFile }));
app.use(
  cookieSession({
    maxAge: 10 * 1000,
    keys: ["harish"],
  })
);
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(
//   session({
//     secret: "harish",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

app.use(cookieParser("harish"));

// initializePassport(passport);

//----------------------------------------------END OF MIDDLEWARES-----------------------------------------------------

// user authantication routes
// public routes
app.use("/auth", userRoutes);
// images
app.use("/upload", uploadRoutes);

// authenticated routes
// middleware to check that req has user or not
const chekAuth = (req, res, next) => {
  console.log(req.body);
  if (!req.body.userId) {
    res.status(400).json({ errors: "Bad Requst" });
  } else {
    next();
  }
};
app.use("/post", chekAuth, postRoutes);
app.use("/like", chekAuth, likeUnlikeRoutes);

app.use("/category", categoryRoutes);
app.use("/comment", commentRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Pet Social backend.......");
});
