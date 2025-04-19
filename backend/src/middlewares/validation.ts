import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import TwitterError from "../errors/twitter-error";

export default function validation(validator: ObjectSchema) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      // ✅ המרה של שדות מספריים ותאריכים שהגיעו כמחרוזת (FormData)
      if (req.body.price) {
        req.body.price = parseFloat(req.body.price);
      }
      if (req.body.startDate) {
        req.body.startDate = new Date(req.body.startDate);
      }
      if (req.body.endDate) {
        req.body.endDate = new Date(req.body.endDate);
      }

      req.body = await validator.validateAsync(req.body);
      next();
    } catch (e: any) {
      next(
        new TwitterError(
          422, 
          e.message
        )
      );
    }
  };
}
