import { AppError } from "../utils/appError.js";
import jwt from "jsonwebtoken";
import userModel from "../../Models/user.Models.js";
//================================================

export const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      //check token
      const { token } = req.headers;
      if (!token) {
        next(new AppError("token is not exist", 400));
      }
      //===============
      //for more security use (Bearer)
      if (!token.startsWith("abdo_")) {
        next(new AppError("invalid token", 400));
      }
      //================
      const newToken = token.split("abdo_")[1];
      if (!newToken) {
        next(new AppError("invalid token", 400));
      }
      //================
      // verify token
      const decoded = jwt.verify(newToken, "abdo");
      if (!decoded?.id) {
        next(new AppError("invalid token", 400));
      }
      //================
      const user = await userModel.findById(decoded.id);
      if (!user) {
        next(new AppError("user not found", 404));
      }
      //================
      //authorization
      if (!roles.includes(user.role)) {
        next(new AppError("you don't have permission", 401));
      }
      //================
      req.user = user;
      //================
      next();
      //================
    } catch (err) {
      next(new AppError(err, 500));
    }
  };
};
