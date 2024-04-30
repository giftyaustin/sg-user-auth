import * as express from "express";
import { validatePayload } from "../middlewares/validatePayload";
import { loginUserSchema, signupUserSchema, updatePasswordSchema } from "../payload-schemas/user";
import { tryCatch } from "../lib/tryCatch";
import { getUserDetails, loginUser, logoutUser, signupUser, updatePassword } from "../controllers/userController";
import { validateAccessToken } from "../middlewares/validateAccessToken";
export const userRouter = express.Router();

userRouter.post("/signup",validatePayload(signupUserSchema), tryCatch(signupUser));
userRouter.post('/login', validatePayload(loginUserSchema), tryCatch(loginUser))
userRouter.get('/get-user',tryCatch(validateAccessToken), tryCatch(getUserDetails))
userRouter.post('/update-password', validatePayload(updatePasswordSchema), tryCatch(validateAccessToken), tryCatch(updatePassword))
userRouter.get('/logout', tryCatch(logoutUser))