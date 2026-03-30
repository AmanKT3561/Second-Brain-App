import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ContentModel, UserModel, LinkModel } from "./db.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./utils.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Invalid input" });
    }
    if (username.length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await UserModel.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    await UserModel.create({ username, password });
    res.json({ message: "User created successfully" });
  } catch (err) {
    console.error("Sign up error:", err);
    res.status(500).json({ message: "Failed to create user" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    // Find by username only, then compare password separately
    const user = await UserModel.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (err) {
    console.error("Sign in error:", err);
    res.status(500).json({ message: "Failed to sign in" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    await ContentModel.create({
      title: req.body.title,
      link: req.body.link,
      type: req.body.type,
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
  const content = await ContentModel.find({ userId }).populate("userId", "username");
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
      res.json({ hash: existingLink.hash });
      return;
    }
    const hash = random(10);
    await LinkModel.create({ userId, hash });
    res.json({ hash });
  } else {
    await LinkModel.deleteOne({ userId });
    // Bug fix: was missing a response — client would hang forever
    res.json({ message: "Share link removed" });
  }
});

// Bug fix: shareLink is public — removed userMiddleware so unauthenticated users can view shared brains
app.get("/api/v1/brain/shareLink/:shareLink", async (req, res) => {
  const hash = req.params.shareLink as string;
  if (!hash) {
    res.status(400).json({ message: "Share link is required" });
    return;
  }

  try {
    const link = await LinkModel.findOne({ hash });
    if (!link) {
      res.status(404).json({ message: "Share link not found" });
      return;
    }
    const user = await UserModel.findById(link.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const content = await ContentModel.find({ userId: link.userId });
    res.json({ username: user.username, content });
  } catch (err) {
    console.error("Share link error:", err);
    res.status(500).json({ message: "Failed to fetch shared content" });
  }
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
