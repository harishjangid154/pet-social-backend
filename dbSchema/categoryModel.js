import { Schema, model } from "mongoose";

const categoryModel = new Schema({
  name: String,
  image: String,
});

export default model("categories", categoryModel);
