import { NextFunction, Request, Response } from "express";
import {
  handleDuplicateEntry,
  handleValidationError,
} from "./mongooseErrorHandler";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ValidationError") {
    handleValidationError(err, res);
    return;
  }
  if (err.code === 11000) {
    handleDuplicateEntry(err, res);
    return;
  }
  if(err.name === "JsonWebTokenError"){
    return res.status(401).json({
      status: false,
      message: "Invalid token",
    });
  }

  return res.status(500).json({
    status: false,
    message: err.message || "Internal server error",
  });
};
