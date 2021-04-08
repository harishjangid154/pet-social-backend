import { Schema, model } from "mongoose";

const commentModel = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  commentBody: { type: String, required: true },
});

export default model("comments", commentModel);
