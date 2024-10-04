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
  const message = device + " " + action;
  mqttClient.publish("data_sensor", message, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Published with message:", message);
    }
  });
});

export default router;
