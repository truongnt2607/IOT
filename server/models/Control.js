import mongoose, { Schema } from "mongoose";
import Inc from "mongoose-sequence";

const AutoIncrement = Inc(mongoose);

const ControlSchema = new Schema(
  {
    _id: { Type: Number },
    device: String,
    action: String,
    time: String,
  },
  {
    _id: false,
  }
);

ControlSchema.plugin(AutoIncrement);

export default mongoose.model("Cotrol", ControlSchema);
