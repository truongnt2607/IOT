import mongoose, { Schema } from "mongoose";
import Inc from "mongoose-sequence";

const AutoIncrement = Inc(mongoose);

const DataSchema = new Schema(
  {
    id: { Type: Number },
    temperature: Number,
    humidity: Number,
    light: Number,
    time: String,
    dust: Number,
  },
  {
    id: false,
  }
);

DataSchema.plugin(AutoIncrement, { inc_field: "id" });

export default mongoose.model("DataSensor", DataSchema);
