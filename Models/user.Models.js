import mongoose from "mongoose";
import { systemRoles } from "../Src/utils/systemRoles.js";

//==============================================
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpExpires: {
    type: Date,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  //Todo=> for authorization 👇👇
  role: {
    type: String,
    enum: Object.values(systemRoles),
    default: "user",
  },
});
//================
const userModel = mongoose.model("User", userSchema);
//==============================================

export default userModel;
