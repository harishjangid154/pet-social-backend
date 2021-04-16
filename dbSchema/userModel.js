import { Schema, model } from "mongoose";

const userModel = new Schema({
  userName: { type: String, unique: true, required: true, minlength: 4 },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdOn: { type: Date, default: Date.now() },
  userImage: {
    type: String,
    default: "http://localhost:5000/upload/default.jpg",
  },
  googleId: String,
});

export default model("users", userModel);
