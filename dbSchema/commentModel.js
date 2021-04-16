import { Schema, model } from "mongoose";

const commentModel = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  text: { type: String, required: true },
});

export default model("comments", commentModel);
