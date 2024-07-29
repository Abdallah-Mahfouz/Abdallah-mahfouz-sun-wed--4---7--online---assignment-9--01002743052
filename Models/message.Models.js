import mongoose from "mongoose";

//==============================================

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
//================
const messageModel = mongoose.model("Message", messageSchema);
//==============================================
export default messageModel;
