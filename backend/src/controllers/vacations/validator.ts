import Joi from "joi";

export const newVacationValidator = Joi.object({
  destination: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).required(),
  startDate: Joi.date().greater("now").required(), 
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
  price: Joi.number().min(0).max(10000).required(), 
}).unknown(true);

export const updateVacationValidator = Joi.object({
  destination: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
  price: Joi.number().min(0).max(10000).required(),
}).unknown(true); 

export const newVacationFilesValidator = Joi.object({
  image: Joi.object({
    mimetype: Joi.string().valid("image/png", "image/jpg", "image/jpeg").required(),
  }).optional(),
}).unknown(true);
