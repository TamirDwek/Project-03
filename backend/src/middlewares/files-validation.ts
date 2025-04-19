import { NextFunction, Request , Response } from "express";
import { ObjectSchema } from "joi";
import TwitterError from "../errors/twitter-error";

export default function filesValidation(validator: ObjectSchema){
    return async function (req: Request, res:Response, next: NextFunction){
        try{
         req.files = await validator.validateAsync(req.files)
         next()
        }catch (e){
            next(new TwitterError(
                422, // 422 http code for Unprocessable Entity
               e.message
            )
             
            )
        }
    }
}



