import { NextFunction, Request, Response } from "express";
import TwitterError from "../../errors/twitter-error";
import { StatusCodes } from "http-status-codes";


export default function errorResponder(err: Error ,req: Request,res: Response,next: NextFunction){
    if(err instanceof TwitterError){
      res.status(err.status).send(err.message)
    }
    else{   
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: `Internal Server Error`
         })
    }
}