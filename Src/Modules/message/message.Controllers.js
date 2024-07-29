import messageModel from "../../../Models/message.Models.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
//================================================
//!=========  getUserMessage   =============
export const getUserMessage = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const message = await messageModel.find({ receiverId: userId }).populate({
    path: "receiverId",
    select: "name , email",
  });
  res.status(200).json({ msg: "success", message });
});
//================================================
//!=========  createMessage   =============
export const createMessage = asyncHandler(async (req, res) => {
  const { content, receiverId } = req.body;
  const message = await messageModel.create({
    content,
    receiverId,
  });
  res.status(201).json({ msg: "success", message });
});
//================================================
//!=========  deleteMessage   =============
export const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const message = await messageModel.findOneAndDelete(
    { _id: id, receiverId: req.user.id },
    { new: true }
  );
  if (!message) {
    next(new AppError("message not found", 404));
  }
  res.status(200).json({ msg: "delete success", message });
});
//================================================
