import { json, Router } from "express";
import DataSensor from "../models/DataSensor.js";
import mqtt from "mqtt";

const client = mqtt.connect("http://localhost:1893", {
  username: "Nguyen_Trong_Truong",
  password: "B21DCCN740",
});

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  client.subscribe("data_sensor", (err) => {
    if (!err) {
      console.log(`Subscribed to topic: data_sensor`);
    } else {
      console.error("Subscription error:", err);
    }
  });
});

client.on("message", (topic, message) => {
  try {
    const jsonData = JSON.parse(message);
    console.log(jsonData);
  } catch (err) {
    console.error(err);
  }
});

const router = Router();

router.get("/", async (req, res) => {
  const data = await DataSensor.find({});
  console.log(data);
  res.json(data);
});

export default router;
