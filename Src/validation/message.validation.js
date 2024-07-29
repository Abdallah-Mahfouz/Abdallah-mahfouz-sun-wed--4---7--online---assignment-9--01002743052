import Joi from "joi";
import generalFields from "../utils/generalFields.js";

//================================================
//!=========  getUserMessages   =============
export const getUserMessagesValidation = {
  headers: generalFields.headers.required(),
};
//================================================
//!=========  createMessage   =============
export const createMessageValidation = {
  body: Joi.object({
    content: Joi.string().required(),
    receiverId: Joi.string().required(),
  }),
};
//================================================
//!=========  deleteMessage   =============
export const deleteMessageValidation = {
  params: Joi.object({
    id: generalFields.id.required(),
  }),
  headers: generalFields.headers.required(),
};
//================================================
