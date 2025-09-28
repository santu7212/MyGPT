import { Router } from "express";
import {
  createChat,
  deleteChat,
  getChats,
} from "../controllers/chat.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/chat").post(verifyJwt, createChat);
router.route("/get").get(verifyJwt, getChats);
router.route("/delete-chat").post(verifyJwt, deleteChat);


export default router