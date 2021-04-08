import { Schema, model } from "mongoose";

const postModel = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  userName: { type: String, required: true },
  userFullName: { type: String, required: true },
  postTitle: { type: String, required: true },
  postDesc: { type: String },
  postImage: { type: String },
  userImage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  likeCount: { type: Number, default: 0 },
  unlikeCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  category: { type: String, default: "others" },
});

export default model("posts", postModel);
