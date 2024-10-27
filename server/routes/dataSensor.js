import { Router } from "express";
import getCurrentTime from "../controller/getCurrentTime.js";
import client from "../ConnectMQTT.js";
import { dataSensorController } from "../controller/index.js";
import DataSensor from "../models/DataSensor.js";

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
    const data = {
      ...jsonData,
      time: getCurrentTime(),
    };
    const newDataSensor = new DataSensor(data);
    await newDataSensor.save();
    console.log(`Save: ${newDataSensor}`);
  } catch (err) {
    console.error(err);
  }
});

const router = Router();

router.get("/", dataSensorController.get15DataSensor);

router.get("/all", dataSensorController.getDataSensor);

export default router;
