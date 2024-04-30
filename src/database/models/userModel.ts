import { NextFunction, Request, Response } from "express";

import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "Please enter a valid email",
    },
  },
  password: { type: String, required: true, minLength: 8, select: false },
  username: { type: String, required: true, minLength: 3 },
});
userSchema.methods.sendJWT = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = jwt.sign(this.id, process.env.JWT_SECRET!);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.json({
    success: true,
    message: "token sent sucessfully",
  });
};

export const User = mongoose.model("User", userSchema);

