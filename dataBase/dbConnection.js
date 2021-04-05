const monk = require("monk");
require("dotenv").config();
const db = monk(process.env.DB_URI);
db.then(() => {
  console.log("Connected to database");
}).catch((err) => {
  console.log(err);
});
const users = db.get("users");
const posts = db.get("posts");
const userImage = db.get("userimage");
const postImage = db.get("postimage");
module.exports = { users, posts, userImage, postImage };
