import Router from "express";
import { categroy } from "../api/categoriesController";

const router = Router();

router.post("/", categroy);

export default router;
