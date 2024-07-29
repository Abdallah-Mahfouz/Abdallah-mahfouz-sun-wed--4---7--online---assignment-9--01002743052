import Joi from "joi";
import generalFields from "../utils/generalFields.js";
//================================================
//!=========  signUp   =============
export const signUpValidation = {
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
  }),
};

//================================================
//!=========  signIn   =============
export const signInValidation = {
  body: Joi.object({
    email: generalFields.email.required(),
    password: generalFields.password.required(),
  }),
};
//================================================
//!=========  confirmEmail   =============
export const confirmEmailValidation = {
  body: Joi.object({
    email: generalFields.email.required(),
    otp: Joi.string().required(),
  }),
};
//================================================
//!=========  updateUser   =============
export const updateUserValidation = {
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: generalFields.email,
    password: generalFields.password,
  }),
  headers: generalFields.headers.required(),
};
//================================================
//!=========  deleteUser   =============
export const deleteUserValidation = {
  headers: generalFields.headers.required(),
}