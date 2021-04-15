import { Router } from "express";
import { signup, login } from "../api/userController";
require("dotenv").config();
// import passport from "passport";

import { google } from "googleapis";

const oAuthClient = new google.auth.OAuth2(
  process.env.clientID,
  process.env.clientSecret,
  "http://localhost:3000"
);
console.log("nksfjdkb");
console.log(process.env.clientID, process.env.clientSecret);
const scopes = ["profile", "email"];

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/google", async (req, res) => {
  console.log(req.body.code);
  let access_token;
  oAuthClient
    .getToken(req.body.code)
    .then((response) => {
      // console.log(response.tokens.access_token);
      access_token = response.tokens.access_token;
      oAuthClient.setCredentials(access_token);
    })
    .catch((err) => console.log(err));

  return res.status(200).json({ ok: "ok", access_token });
});

router.post("/google/redirect", (req, res) => {
  console.log("redirected");
  res.json("done");
});
export default router;
