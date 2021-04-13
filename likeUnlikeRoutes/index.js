import Router from "express";
import postModel from "../dbSchema/postModel";
import userModel from "../dbSchema/userModel";
import {
  addUnlike,
  addlike,
  removeLike,
  removeUnlike,
} from "../api/likeUnlikeController";

const router = Router();

router.post("/addlike/:postId", addlike);
router.post("/removelike/:postId", removeLike);
router.post("/addunlike/:postId", addUnlike);
router.post("/removeunlike/:postId", removeUnlike);

export default router;
