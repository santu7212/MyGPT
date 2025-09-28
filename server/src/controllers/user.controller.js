import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Chat } from "../models/chats.model.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ApiError(400, "Request body is required");
  }

  const { name, email, password } = req.body;
   

  if (
    [name, email, password].some((field) => String(field || "").trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new ApiError(409, "User with email already exists");
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user: createdUser,
        token,
      },
      "User created successfully"
    )
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "User name and email is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "User does not exist ");
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new ApiError(400, "email or password is in correct");
  }
  const token = generateToken(user._id);
  if (!token) {
    throw new ApiError(500, "somthing went wrong whiler generating token");
  }

  const loggedInUser = await User.findById(user._id);
  if(!loggedInUser){
    throw new ApiError(400,"Invalid email or password ")
  }

  return res
    .status(200)

    .json(
      new ApiResponse(
        200,
        {
          loggedInUser,
          token,
        },

        "User logged in successfully"
      )
    );
});

const getUserData = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(500, "Unable to fetch use data ");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User data fetched successfully "));
});

const getPublishedImages = asyncHandler(async (req, res) => {
  const publishedImagesMessages = await Chat.aggregate([
    { $unwind: "$messages" },
    {
      $match: {
        "messages.isImage": true,
        "messages.isPublished": true,
      },
    },
    {
      $project: {
        _id: 0,
        imageUrl: "$messages.content",
        userName: "$userName",
      },
    },
  ]);
  if (!publishedImagesMessages.length) {
    throw new ApiError("Somethin went wrong while geting  images  ");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { images: publishedImagesMessages.reverse() },
        "Image is fetched successfully"
      )
    );
});

export { registerUser, loginUser, getUserData, getPublishedImages };
