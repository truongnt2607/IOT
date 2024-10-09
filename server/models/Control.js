import mongoose, { Schema } from "mongoose";

const ControlSchema = new Schema({
  _id: Number,
  device: String,
  action: String,
  time: String,
});

export default mongoose.model("Cotrol", ControlSchema);
