import { Router } from "express";
import {
  imageGenerationController,
  textMessageController,
} from "../controllers/message.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/text").post(verifyJwt, textMessageController);
router.route("/image").post(verifyJwt, imageGenerationController);

export default router;
