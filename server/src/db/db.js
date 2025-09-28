 import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

 export const connectDB = async () => {
  try {
    mongoose.connection.on("connected",()=>console.log("Database connected successfully")
    )
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n Mongodb connected !! DB HOST :${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongo db coonect error ", error);
    process.exit(1);
  }
};

export default connectDB;
