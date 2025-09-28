import { Router } from "express";
import {
  getPublishedImages,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/data").get(verifyJwt, getUserData);
router.route("/get-images").get(verifyJwt, getPublishedImages)

export default router;
