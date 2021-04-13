import Router from "express";
import { addComment, getComment } from "../api/commentController";

const router = Router();

router.post("/add", addComment);
router.post("/get/:commentId", getComment);

export default router;
