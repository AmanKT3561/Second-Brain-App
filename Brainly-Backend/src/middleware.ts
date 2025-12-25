import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";


const secret = process.env.JWT_SECRET as string;

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization as string | undefined;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;
    try {
        const decoded = jwt.verify(token, secret) as { id?: string } | null;
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "You're not authorized" });
        }
        // @ts-ignore - attach user id to request
        req.user = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }

}


    
