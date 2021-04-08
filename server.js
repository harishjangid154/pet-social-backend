import express from "express";
import cors from "cors";
import userRoutes from "./userRoutes";
import uploadRoutes from "./uploadRoutes";
import postRoutes from "./postRoutes";
import "dotenv/config";
import { connect } from "mongoose";

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
app.use("/auth", userRoutes);

app.use("/post", postRoutes);
// images
app.use("/upload", uploadRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Pet Social backend.......");
});
