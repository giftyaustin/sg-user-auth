import { NextFunction, Request, Response } from "express";
import Joi from "joi";


export const validatePayload = (schema:Joi.AnySchema) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: false,
                error: error.details[0].message
            });
        } else {
            next();
        }
    }
}