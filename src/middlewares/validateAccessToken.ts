import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../database/models/userModel";


declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }

export const validateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  
    const accessToken = req.cookies.token || req.headers.token || '';
    if(!accessToken){
        return res.status(401).json({
            status: false,  
            error: "User unauthorized"
        })
    }
    
    
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!);

    const user = await User.findById(decoded).select("+password");
    if(!user){
        return res.status(401).json({
            status: false,  
            error: "User unauthorized"
        })
    }
    req.user = user;
    next();
}