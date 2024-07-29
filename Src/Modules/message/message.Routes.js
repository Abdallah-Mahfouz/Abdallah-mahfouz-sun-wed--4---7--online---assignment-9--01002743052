import express from "express";
import * as NC from "./message.Controllers.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as MV from "../../validation/message.validation.js";
import { systemRoles } from "../../utils/systemRoles.js";

//================================================
const router = express.Router();
//================================================
router.get(
  "/user",
  auth([systemRoles.admin, systemRoles.user]),
  validation(MV.getUserMessagesValidation),
  NC.getUserMessage
);
router.post("/", validation(MV.createMessageValidation), NC.createMessage);
router.delete(
  "/:id",
  auth([systemRoles.admin, systemRoles.user]),
  validation(MV.deleteMessageValidation),
  NC.deleteMessage
);
//================================================
export default router;
