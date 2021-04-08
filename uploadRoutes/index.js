import { uploadImage, sendImage } from "../api/imageUploadController";

import { Router } from "express";
const router = Router();
import imageUploadEngine from "../storageEngine/imageStorageEngine";

router.post("/", imageUploadEngine.single("img"), uploadImage);
router.get("/:imagename", sendImage);

module.exports = router;
