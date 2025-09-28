import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Chat } from "../models/chats.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//? step 1 Create a new Chat

const createChat = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const chatData = {
      userId,
      messages: [],
      chatName: "New Chat",
      userName: req.user.name,
    };

    const newChat = await Chat.create(chatData);
    return res
      .status(201)
      .json(new ApiResponse(200, newChat, "Chat created successfully"));
  } catch (error) {
    throw new ApiError(
      400,
      error.message || "Something went wrong while creating chat "
    );
  }
});

//? step 2 get chat data
const getChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "User not found");
  }
  const chats = await Chat.find({userId}).sort({ updatedAt: -1 });
  if (!chats) {
    throw new ApiError(500, "chat data not fetched ");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, chats, "Chat data fetched successfully"));
});



//? step 3 delete chats
const deleteChat = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const chatId = req.body.chatId;

   await Chat.deleteOne({ _id: chatId, userId });

   

  return res.status(200).json( new ApiResponse(200, "Chat data deleted successfully"))
});

export { createChat, getChats, deleteChat };




