import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";


const secret = process.env.JWT_SECRET as string;

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({
            message: "No token provided"
        });
    }
    const decoded = jwt.verify(header, secret) as { username: string };
    if(!decoded){
        return res.status(401).json({
            message: "youre not authorized"
        })
    }
    else{
        //@ts-ignore
        req.user = decoded.id;
        next();
    }

}


    
