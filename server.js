import express from "express";
import cors from "cors";
import userRoutes from "./userRoutes";
import uploadRoutes from "./uploadRoutes";
import postRoutes from "./postRoutes";
import "dotenv/config";
import { connect } from "mongoose";
import likeUnlikeRoutes from "./likeUnlikeRoutes";

connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to database");
});
const app = express();
app.use(express.json());
app.use(require("body-parser").json());
app.use(cors());

// user authantication routes
// public routes
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Pet Social backend.......");
});
