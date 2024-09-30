import { Router } from "express";
import mqtt from "mqtt";

const router = Router();

const mqttClient = mqtt.connect("mqtt://192.168.0.102", {
  username: "Nguyen_Trong_Truong",
  password: "B21DCCN740",
});

mqttClient.on("connect", () => {
  console.log("Connected to MQTT Broker");
});

router.post("/api/control", (req, res) => {
  const { device, action } = req.body;
  console.log(device, action);
  res.send("Sussesfully!");
});

export default router;
