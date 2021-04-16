import Router from "express";
import {
  addUnlike,
  addlike,
  removeLike,
  removeUnlike,
  add,
} from "../api/likeUnlikeController";

const router = Router();

router.post("/add/:postId", add);
router.post("/addunlike/:postId", addUnlike);

export default router;
