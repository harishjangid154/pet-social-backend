// const userModel = require("../dbSchema/userModel");
import userModel from "../dbSchema/userModel";
import jwt from "jsonwebtoken";

const signup = (req, res) => {
  const user = new userModel(req.body);
  console.log(user);
  user
    .save()
    .then(() => {
      let token;
      const payload = {
        userName: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdOn: user.createdOn,
        userImage: user.userImage,
        _id: user._id,
      };
      try {
        token = jwt.sign(payload, "ppl");
        console.log(token);
      } catch (error) {
        console.log(error);
      }
      return res.status(200).json({ token: token });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
};

const login = (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .then((data) => {
      console.log(data.password === req.body.password);
      if (data.password === req.body.password) {
        // req.logIn(data, (err) => {
        //   if (err) console.log(err);
        //   res.send("authenticated");
        // });
        const payload = {
          userName: data.userName,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          createdOn: data.createdOn,
          userImage: data.userImage,
          _id: data._id,
        };
        let token;
        try {
          token = jwt.sign(payload, "ppl");
        } catch (error) {
          console.log(error);
        }
        return res.status(200).json({ token: token });
      } else {
        return res.status(400).json({ errors: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ errors: "Invalid Credentials" });
    });
  console.log("called");
};
const updateUser = (req, res) => {
  if (!req.body.user) {
    return res.status(500).json({ message: "Login to use this route" });
  }
};

export { signup, login, updateUser };
