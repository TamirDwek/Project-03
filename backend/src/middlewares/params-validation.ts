import { NextFunction, Request , Response } from "express";
import { ObjectSchema } from "joi";
import TwitterError from "../errors/twitter-error";

export default function paramsValidation(validator: ObjectSchema){

    return async function (req: Request, res:Response, next: NextFunction){
        try{
         req.params = await validator.validateAsync(req.params)
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



