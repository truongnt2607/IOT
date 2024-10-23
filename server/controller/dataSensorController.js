import DataSensor from "../models/DataSensor.js";

const get15DataSensor = async (req, res) => {
  const data = await DataSensor.find().sort({ _id: -1 }).limit(15);
  res.status(200).json(data);
};

const getAllDataSensor = async (req, res) => {
  const data = await DataSensor.find({});
  res.status(200).json(data);
};

export default { get15DataSensor, getAllDataSensor };
