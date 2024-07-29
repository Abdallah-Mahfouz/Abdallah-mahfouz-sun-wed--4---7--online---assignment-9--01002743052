import userModel from "../../../Models/user.Models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../services/sendEmail.js";
import { AppError } from "../../utils/appError.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
//================================================
//!=========  signUp   =============
export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  //==================
  const emailExist = await userModel.findOne({ email });
  if (emailExist) {
    next(new AppError("email is already exist", 400));
  }
  //==================
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
  const otpHtml = `<p>Your OTP code is <b>${otp}</b>. It will expire in 10 minutes.</p>`;

  //==================

  const checkSendEmail = await sendEmail(email, "OTP Confirmation", otpHtml);
  if (!checkSendEmail) {
    next(new AppError("failed to send OTP email", 400));
  }
  //==================

  const hash = await bcrypt.hash(password, 8);
  await userModel.create({ name, email, password: hash, otp, otpExpires });
  res.status(201).json({ msg: "success", user: email });
});

//================================================
//!=========  confirmEmail   =============
export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  // Find the user by email and OTP while checking that OTP is valid and not expired
  const user = await userModel.findOne({
    email,
    otp,
    otpExpires: { $gt: new Date() },
    confirmed: false,
  });

  if (!user) {
    return next(
      new AppError("Invalid OTP or user not found, or already confirmed", 404)
    );
  }

  // Update the user's status to confirmed
  await userModel.findOneAndUpdate(
    { _id: user._id },
    {
      confirmed: true,
      otp: null, // Clear the OTP
      otpExpires: null, // Clear the OTP expiration time
    },
    { new: true }
  );

  res.status(200).json({ msg: "Email confirmed successfully" });
});
//================================================
//!=========  signIn   =============
export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const emailExist = await userModel.findOne({ email, confirmed: true });
  if (!emailExist || !bcrypt.compareSync(password, emailExist.password)) {
    next(
      new AppError(
        "email not exist or not confirmed or password incorrect",
        404
      )
    );
  }
  const token = jwt.sign({ id: emailExist.id, email: email }, "abdo", {
    expiresIn: "1d",
  });

  res.status(201).json({ msg: "success", token });
});
//================================================
//!=========  updateUser   =============
export const updateUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 8);

  const user = await userModel.findOneAndUpdate(
    { _id: req.user.id },
    { name, email, password: hash },
    { new: true }
  );
  res.status(200).json({ msg: "success", user });
});
//================================================
//!=========  deleteUser   =============
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOneAndDelete(
    { _id: req.user.id },
    { new: true }
  );
  res.status(200).json({ msg: "success", user });
});
