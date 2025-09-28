import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

const tarnsactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    planId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Transaction=mongoose.model("Transaction",tarnsactionSchema)

export {Transaction}