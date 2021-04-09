import { Router } from "express";
import { uploadPost, getPosts, getSinglePost } from "../api/postController";

const router = Router();

router.post("/", uploadPost);
router.post("/posts", getPosts);
router.get("/:postId", getSinglePost);

export default router;
