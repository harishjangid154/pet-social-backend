const express = require("express");
const cors = require("cors");
const multer = require("multer");

const userFileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./userImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const userUploadEngine = multer({ storage: userFileStorage });

const { login, signup, getUser } = require("./auth/authFunctions");
const {
  putPost,
  getPosts,
  getSinglePost,
  uploadPostImage,
} = require("./posts/postActions");
const { userImage } = require("./dataBase/dbConnection");

//app
const app = express();
app.use(express.json());
app.use(require("body-parser").json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// user authantication routes
app.post("/api/login", login);
app.post("/api/signup", signup);
app.get("/api/user", getUser);
app.post(
  "/api/userimage",
  userUploadEngine.single("image"),
  async (req, res) => {
    const user = req.body.userName;
    // console.log(req.file);
    await userImage
      .insert({ userName: user, userImagePath: req.file.path })
      .then((doc) => {
        console.log(doc);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    res.status(200).sendFile(__dirname + "/" + req.file.path);
  }
);

//post routes

app.post("/api/post", putPost);
app.get("/api/post", getPosts);
app.get("/api/getpost", getSinglePost);
app.post("/api/postimage", uploadPostImage);

// images

app.get("/userimages/:imagename", (req, res) => {
  console.log(req.params.imagename);
  res.status(200).sendFile(__dirname + "/userImages/" + req.params.imagename);
});
app.get("/postimage/:imagename", (req, res) => {
  res.status(200).sendFile(__dirname + "/postImages/" + req.params.imagename);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Pet Social backend.......");
});
