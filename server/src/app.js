 import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { stripeWebhooks } from "./controllers/webhook.controller.js";
const app = express();



app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
app.use(cookieParser());


app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);
import chatsRouter from "./routes/chat.routes.js";
app.use("/api/v1/chats", chatsRouter);
import messageRouter from "./routes/message.routes.js";
app.use("/api/v1/messages", messageRouter);
import creditRouter from "./routes/credits.routes.js";

app.use("/api/v1/credit", creditRouter);

export { app };
