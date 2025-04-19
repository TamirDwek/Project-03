import Joi from "joi";

// Login Validator
export const loginValidator = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).max(50).required(),
  password: Joi.string().min(4).max(40).required(),
});

// Register Validator (sign-up)
export const signValidator = loginValidator.append({
  firstName: Joi.string().min(2).max(40).required(),
  lastName: Joi.string().min(2).max(40).required(),
});
