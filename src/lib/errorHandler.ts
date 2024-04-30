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

  console.error(err);
  return res.status(500).json({
    status: false,
    message: "Internal server error",
  });
};
