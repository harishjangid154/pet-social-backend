import path from "path";

const uploadImage = (req, res) => {
  console.log("inside uploadimage");
  console.log(req.file);
  return res.status(200).json({
    imagePath: "http://localhost:5000/upload/" + req.file.path.split("/")[1],
  });
};
const r = path.join(__dirname + "/../images/");
console.log(r);
const sendImage = (req, res) => {
  console.log(req.params.imagename);
  const filename = req.params.imagename;
  const fullpath = path.resolve("./images/" + filename);
  // console.log(fullpath);
  res.status(200).sendFile(fullpath);
  // res.json("hello");
};

export { uploadImage, sendImage };
