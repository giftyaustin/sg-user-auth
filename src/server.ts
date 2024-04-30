// src/index.ts
import express from 'express';
import { connectDB } from './database/connectDB';
import dotenv from 'dotenv';
import { userRouter } from './routers/userRouter';
import { errorHandler } from './lib/errorHandler';
dotenv.config();
const app = express();
connectDB()

app.use(express.json());
app.use(userRouter)
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});




/**
 * This middleware handles all the remaining errors
 * --->  Also handles mongoose validation errors
 */
app.use(errorHandler)
const PORT = 54321;
app.listen(PORT, () => {
  console.log(`=========== http://localhost:${PORT} =============`);
});