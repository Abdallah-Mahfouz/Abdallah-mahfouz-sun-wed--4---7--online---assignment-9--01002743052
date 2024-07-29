import mongoose from "mongoose";

const connectionDB = async () => {
  return await mongoose
    .connect("mongodb://127.0.0.1:27017/Sarah")
    .then(() => {
      console.log("Connected successfully to mongodb");
    })
    .catch((err) => {
      console.log(err);
    });
};
export default connectionDB
