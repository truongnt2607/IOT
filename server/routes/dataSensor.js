import { Router } from "express";
import DataSensor from "../models/DataSensor.js";
import getCurrentTime from "../controller/getCurrentTime.js";
import client from "../ConnectMQTT.js";

client.subscribe("data_sensor", (err) => {
  if (!err) {
    console.log(`Subscribed to topic: data_sensor`);
  } else {
    console.error("Subscription error:", err);
  }
});

client.on("message", async (topic, message) => {
  try {
    const jsonData = JSON.parse(message.toString());
    const newestData = await DataSensor.find({}).sort({ _id: -1 }).limit(1);
    const data = {
      _id: newestData[0]._id + 1,
      ...jsonData,
      time: getCurrentTime(),
    };
    const newDataSensor = new DataSensor(data);
    await newDataSensor.save();
    console.log("save done!");
  } catch (err) {
    console.error(err);
  }
});

const router = Router();

router.get("/", async (req, res) => {
  const data = await DataSensor.find().sort({ _id: -1 }).limit(15);
  res.status(200).json(data);
});

router.get("/all", async (req, res) => {
  const data = await DataSensor.find({});
  res.status(200).json(data);
});

export default router;
