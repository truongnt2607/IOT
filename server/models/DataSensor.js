import mongoose, { Schema } from "mongoose";

const DataSchema = new Schema({
  _id: Number,
  temperature: Number,
  humidity: Number,
  light: Number,
  time: String,
});

export default mongoose.model("DataSensor", DataSchema);
