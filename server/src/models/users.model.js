import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      default: 20,
    },
  },
  {
    timestamps: true,
  }
);

// Hash Password before save 

userSchema.pre("save", async function (next){
    if(! this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password, 10);
    next();
})
 



const User = mongoose.model("User", userSchema);


export {User}