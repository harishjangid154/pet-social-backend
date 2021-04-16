import multer from "multer";

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
