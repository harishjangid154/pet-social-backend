import { Router } from "express";
import { signup, login, loginWithGoogle } from "../api/userController";

// console.log("nksfjdkb");
// console.log(process.env.clientID, process.env.clientSecret);
// const scopes = ["profile", "email"];

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

// OAuth with google
router.post("/google", loginWithGoogle);

router.post("/google/redirect", (req, res) => {
  console.log("redirected");
  res.json("done");
});
export default router;
