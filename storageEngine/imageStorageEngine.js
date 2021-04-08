// const multer = require("multer");

import multer from "multer";

// const userFileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../userImages");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "--" + file.originalname);
//   },
// });

// const postFileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../postImages");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "---" + file.originalname);
//   },
// });

// const userUploadEngine = multer({ storage: userFileStorage });
// const postUploadEngine = multer({ storage: postFileStorage });

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("inside storage");
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const imageUploadEngine = multer({ storage: imageStorage });
export default imageUploadEngine;
