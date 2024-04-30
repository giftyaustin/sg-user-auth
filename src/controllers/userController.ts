import { NextFunction, Request, Response } from "express";
import { User } from "../database/models/userModel";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, username, password: hashedPassword });
  if (!user) {
    return res
      .status(400)
      .json({ status: false, error: "Failed to create user" });
  }
  return res
    .status(201)
    .json({ status: true, message: "User created successfully" });
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ status: false, error: "User not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ status: false, error: "Incorrect password" });
  }

  //   Create a  jwt for the user for further authentication
  const token = jwt.sign(user.id, process.env.JWT_SECRET!);

  /**  You do not need to explicitly set the cookie in local storage
   *   as it will be set automatically in cookies securely.
   *  But Im sending the cookie in the response to know if JWT is being generated
   */
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.json({
    success: true,
    message: "Logged in successfully",
    token: token,
  });
};

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username } = req.user;
  return res.status(200).json({
    status: true,
    message: "User details fetched successfully",
    data: { email, username },
  });
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { oldPassword, newPassword } = req.body;
  if(oldPassword === newPassword){
    return res.status(400).json({
      status: false,
      error: "New password cannot be same as old password",
    })
  }
  const email = req.user.email;
  const user = await User.findOne({ email }).select("+password");
  if(!user){
    return res.status(404).json({
      status: false,
      error: "User not found",
    })
  }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        status: false,
        error: "Old password is incorrect",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    return res.status(200).json({
      status: true,
      message: "Password updated successfully",
    });
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.cookie("token", {}, { httpOnly: true, expires: new Date(Date.now()) });
  res.json({
    message: "logged out Successfully",
  });
};
