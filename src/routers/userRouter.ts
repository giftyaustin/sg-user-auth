import * as express from "express";
import { validatePayload } from "../middlewares/validatePayload";
import { loginUserSchema, signupUserSchema } from "../payload-schemas/user";
import { tryCatch } from "../lib/tryCatch";
import { getUserDetails, loginUser, signupUser } from "../controllers/userController";
export const userRouter = express.Router();

userRouter.post("/signup",validatePayload(signupUserSchema), tryCatch(signupUser));
userRouter.post('/login', validatePayload(loginUserSchema), tryCatch(loginUser))
userRouter.get('/get-user',validatePayload,  tryCatch(getUserDetails))