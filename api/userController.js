// const userModel = require("../dbSchema/userModel");
import userModel from "../dbSchema/userModel";
import jwt from "jsonwebtoken";
require("dotenv").config();
// import passport from "passport";

import { google } from "googleapis";
const oAuthClient = new google.auth.OAuth2(
  process.env.clientID,
  process.env.clientSecret,
  "http://localhost:3000"
);

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
      res.cookie("jwt-token", token, { maxAge: 24 * 60 * 60 * 1000 });
      return res.status(200).json({ token: token });
      // return res.cookie("jwt-token", token, {maxAge: 24*60*60*1000})
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
        console.log("loged in");
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
        res.cookie("jwt-token", token, { maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).json({ token: token });
        // return res.cookie("jwt-token", token, {maxAge: 24*60*60*1000})
      } else {
        return res.status(400).json({ errors: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ errors: "Invalid Credentials" });
    });
  console.log("called");
};

const loginWithGoogle = async (req, resp) => {
  // console.log(req, "hello");
  oAuthClient
    .getToken(req.body.code)
    .then((response) => {
      // console.log(response.tokens.access_token);
      const token = response.tokens.access_token;
      oAuthClient.credentials = { access_token: token };
      console.log(oAuthClient);
      const OAuth2 = google.oauth2({
        auth: oAuthClient,
        version: "v2",
      });

      OAuth2.userinfo.get((err, res) => {
        if (err) console.log("userInfo err : ", err);
        else {
          const username = res.data.email.split("@")[0];
          try {
            const user = new userModel({
              userName: username,
              email: res.data.email,
              firstName: res.data.given_name,
              lastName: res.data.family_name,
              userImage: res.data.picture,
              googleId: res.data.id,
            });
            user
              .save()
              .then(() => {
                console.log(user);
                try {
                  const jwtToken = jwt.sign(user, "ppl");
                  console.log(jwtToken, "dfdfdsf");
                  resp.cookie("jwt-token", jwtToken, {
                    maxAge: 24 * 60 * 60 * 1000,
                  });
                  return resp.status(200).json({ jwtToken: jwtToken });
                } catch (error) {
                  console.log(" jwt token Err :", error);
                }
              })
              .catch((err) => {
                userModel.findOne({ googleId: user.googleId }).then((doc) => {
                  const payload = {
                    userName: doc.userName,
                    email: doc.email,
                    firstName: doc.firstName,
                    lastName: doc.lastName,
                    userImage: doc.userImage,
                    googleId: doc.googleId,
                    _id: doc._id,
                  };

                  try {
                    const jwtToken = jwt.sign(payload, "ppl");
                    console.log(jwtToken, "dfdfdsf");
                    resp.cookie("jwt-token", jwtToken, {
                      maxAge: 24 * 60 * 60 * 1000,
                    });
                    return resp.status(200).json({ jwtToken: jwtToken });
                  } catch (error) {
                    console.log(" jwt jwtToken Err user already :", error);
                  }
                });
              });
          } catch (error) {
            console.log("mongo err : ", error);
          }
        }
      });
    })
    .catch((err) => console.log("access token err :   ", err));

  return resp.status(200).json({ ok: "ok", access_token });
};
const updateUser = (req, res) => {
  if (!req.body.user) {
    return res.status(500).json({ message: "Login to use this route" });
  }
};

export { signup, login, updateUser, loginWithGoogle };
