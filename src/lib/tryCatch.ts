import { NextFunction, Request, Response } from "express"

export const tryCatch = (func:Function)=>(req:Request, res:Response, next:NextFunction)=>{
    Promise.resolve(func(req, res, next)).catch(next)
}