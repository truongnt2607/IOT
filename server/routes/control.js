import { json, Router } from "express";
import mqtt from "mqtt";
import Control from "../models/Control.js";
import getCurrentTime from "../controller/getCurrentTime.js";

const router = Router();

const mqttClient = mqtt.connect("mqtt://192.168.112.50", {
  username: "Nguyen_Trong_Truong",
  password: "B21DCCN740",
  port: 1893,
});

mqttClient.on("connect", () => {
  console.log("Connected to MQTT Broker");
});

router.post("/", async (req, res) => {
  const message = req.body;
  const newestControl = await Control.find({}).sort({ _id: -1 }).limit(1);
  const newControl = new Control({
    _id: newestControl[0]._id + 1,
    ...message,
    time: getCurrentTime(),
  });
  mqttClient.publish("control_led", JSON.stringify(message), (err) => {
    if (err) {
      console.log(err);
    } else {
      newControl.save().then(res.status(200).send("Sussessfully!"));
    }
  });
});

router.get("/", async (req, res) => {
  const data = await Control.find({});
  res.status(200).json(data);
});

export default router;
