// const userModel = require("../dbSchema/userModel");
import userModel from "../dbSchema/userModel";

const signup = (req, res) => {
  const user = new userModel(req.body);
  user
    .save()
    .then(() => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const login = (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .then((data) => {
      if (data.password === req.body.password) {
        return res.status(200).json({ user: data });
      } else {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
  console.log("called");
};
const updateUser = (req, res) => {
  if (!req.body.user) {
    return res.status(500).json({ message: "Login to use this route" });
  }
};

export { signup, login, updateUser };
