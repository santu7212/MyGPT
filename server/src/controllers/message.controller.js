import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Chat } from "../models/chats.model.js";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { imagekit } from "../db/image-kit.js";
import { openai } from "../db/open-ai.js";
import axios from "axios";

//? step 1 generate text message

const textMessageController = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (req.user.credits < 1) {
    throw new ApiError(400, "Credits limit is low ");
  }
  if (!userId) {
    throw new ApiError(400, "User not found ");
  }
  const { chatId, prompt } = req.body;
  if (!chatId) {
    throw new ApiError(400, "Chat Id not found ");
  }
  if (!prompt) {
    throw new ApiError(400, "Prmpt not found ");
  }

  const chat = await Chat.findOne({ userId, _id: chatId });

  chat.messages.push({
    role: "user",
    content: prompt,
    timestamp: Date.now(),
    isImage: false,
  });

  const { choices } = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const aiReply = {
    ...choices[0].message,
    timestamp: Date.now(),
    isImage: false,
  };
  if (!aiReply) {
    throw new ApiError(500, "Failed to generate the reply");
  }

  res
    .status(200)
    .json(new ApiResponse(200, aiReply, "Reply generated successfully"));

  chat.messages.push(aiReply);
  await chat.save();
  await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });
});

//? step 2 generate Image

const imageGenerationController = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "User Id not found ");
  }
  if (req.user.credits < 2) {
    throw new ApiError(400, "Credits limit is low ");
  }

  const { prompt, chatId, isPublished } = req.body;

  const chat = await Chat.findOne({ userId, _id: chatId });

  chat.messages.push({
    role: "user",
    content: prompt,
    timestamp: Date.now(),
    isImage: false,
  });

  // encode the prompt
  const encodedPrompt = encodeURIComponent(prompt);

  // construct Image kit AI GENERATED URL
   const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/mygpt/${Date.now()}.png?tr=w-800,h-800`;

  // trigger generation by fetching from the image kit

  const aiImageResponse = await axios.get(generatedImageUrl, {
    responseType: "arraybuffer",
  });

  // convert to base64
  const base64Image = `data:image/png;base64,${Buffer.from(
    aiImageResponse.data,
    "binary"
  ).toString("base64")}`;

  // Upload to image kit media librarry
  const uploadResponse = await imagekit.upload({
    file: base64Image,
    fileName: `${Date.now()}.png`,
    folder: "mygpt",
  });

  const aiReply = {
    role: "assistant",
    content: uploadResponse.url,
    timestamp: Date.now(),
    isImage: true,
    isPublished,
  };
  res
    .status(200)
    .json(new ApiResponse(200, aiReply, "successfully genearted Image "));
  chat.messages.push(aiReply);
  await chat.save();

  await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });
});

export { textMessageController, imageGenerationController };
