import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ContentModel, UserModel } from "./db.js";
import { userMiddleware } from "./middleware.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    const {username , password} = req.body
    try{
        await UserModel.create({username , password})
        res.json({message: "User created successfully"})
    }
    catch(err){
        console.error("Sign up error:", err)
        res.status(400).json({
            message: "User already exists"
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const {username , password} = req.body
    try{
        const user = await UserModel.findOne({ username, password })
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        // Sign with user id so protected routes can use it
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)
        res.json({ token })
    }
    catch(err){
        console.error("Sign in error:", err)
        res.status(500).json({
            message: "Incorrect username or password"
        })
    }
})


app.post("/api/v1/content",userMiddleware , async (req, res) => {
    try {
        const userId = (req as any).user
        if (!userId) return res.status(401).json({ message: "Unauthorized" })

        await ContentModel.create({
            title: req.body.title,
            link: req.body.link,
            userId,
            tags: []
        })

        res.json({ message: "Content created successfully" })
    } catch (err) {
        console.error("Create content error:", err)
        res.status(500).json({ message: "Failed to create content" })
    }
})

app.get("/api/v1/content", userMiddleware , async (req, res) => {
  const userId = (req as any).user
  const content = await ContentModel.find({ userId }).populate("userId", "username")
  res.json(content)
})









app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
