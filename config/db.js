import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

const connectDB = asyncHandler(async () => {
  const con = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${con.connection.host}`);
});

export default connectDB;