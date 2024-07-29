import express from "express";
import * as UC from "../user/user.controllers.js";
import * as UV from "../../validation/user.validation.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { systemRoles } from "../../utils/systemRoles.js";
//================================================

const router = express.Router();

//================================================

router.post("/signUp", validation(UV.signUpValidation), UC.signUp);
router.post("/signIn", validation(UV.signInValidation), UC.signIn);
router.post(
  "/confirmEmail",
  validation(UV.confirmEmailValidation),
  UC.confirmEmail
);
router.put("/", auth([systemRoles.admin, systemRoles.user]), UC.updateUser);
router.delete("/", auth([systemRoles.admin, systemRoles.user]), UC.deleteUser);

//================================================
export default router;
