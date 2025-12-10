import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ContentModel, UserModel, LinkModel } from "./db.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./utils.js";
dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    await UserModel.create({ username, password });
    res.json({ message: "User created successfully" });
  } catch (err) {
    console.error("Sign up error:", err);
    res.status(400).json({
      message: "User already exists",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username, password });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Sign with user id so protected routes can use it
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    res.json({ token });
  } catch (err) {
    console.error("Sign in error:", err);
    res.status(500).json({
      message: "Incorrect username or password",
    });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    await ContentModel.create({
      title: req.body.title,
      link: req.body.link,
      userId,
      tags: [],
    });

    res.json({ message: "Content created successfully" });
  } catch (err) {
    console.error("Create content error:", err);
    res.status(500).json({ message: "Failed to create content" });
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  const userId = (req as any).user;
  const content = await ContentModel.find({ userId }).populate(
    "userId",
    "username"
  );
  res.json(content);
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const userId = (req as any).user;
  const contentId = req.body.contentId;
  if (!contentId)
    return res.status(400).json({ message: "Content ID is required" });

  try {
    await ContentModel.deleteMany({ _id: contentId, userId });
    res.json({ message: "Content deleted successfully" });
  } catch (err) {
    console.error("Delete content error:", err);
    res.status(500).json({ message: "Failed to delete content" });
  }
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const userId = (req as any).user;
  const share = req.body.share;
  if (share) {
    const existingLink = await LinkModel.findOne({ userId });
    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }
    const hash = random(10);
    await LinkModel.create({
      userId,
      hash,
    });
    res.json({ hash });
  } 
  else {
    await LinkModel.deleteOne({
      userId,
    });
  }

});

app.get(
  "/api/v1/brain/shareLink/:shareLink",
  userMiddleware,
  async (req, res) => {
    const hash = req.params.shareLink as string;
    if (!hash) {
      res.status(400).json({ message: "Share link is required" });
      return;
    }
    const link = await LinkModel.findOne({ hash });
    if (!link) {
      res.status(404).json({ message: "Share link not found" });
      return;
    }
    const user = await UserModel.findById(link.userId);
    const content = await ContentModel.find({ userId: link.userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (!content) {
      res.status(404).json({ message: "Content not found" });
      return;
    }
    res.json({
      username: user.username,
      content: content,
    });
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
