import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import { title } from "process";

dotenv.config();

const uri = process.env.MONGODB_URI;

(async () => {
  try {
    if (!uri) {
      throw new Error("MONGODB_URI is not defined");
    }
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err instanceof Error ? err.message : err);
  }
})();

const userSchema = new Schema({
  username: { type: String, unique: true, required: true, minlength: 3 },
  password: { type: String, required: true, minlength: 6 },
});

export const UserModel = mongoose.model("User" , userSchema);


const contentSchema = new Schema({
    title: { type: String, required: true },
    link : String,
    tags :[{type: mongoose.Types.ObjectId , ref: "Tag"}],
    userId:{type: mongoose.Types.ObjectId , ref: "User" , required: true}
});


export const ContentModel = mongoose.model("Content" , contentSchema);

const LinkSchema = new Schema({

  hash: String,
  userId: { type : mongoose.Types.ObjectId , ref: "User" , required: true ,
  unique: true }


})

export const LinkModel = mongoose.model("Link" , LinkSchema);
