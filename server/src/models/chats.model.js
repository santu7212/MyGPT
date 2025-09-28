import mongoose from "mongoose";

import { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    chatName: {
      type: String,
      required: true,
    },
    messages: [
      {
        isImage: {
          type: Boolean,
          required: true,
        },
        isPublished: {
          type: Boolean,
          default: false,
        },
        role: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export { Chat };
