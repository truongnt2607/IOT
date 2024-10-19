import mqtt from "mqtt";

const client = mqtt.connect("http://localhost", {
  username: "Nguyen_Trong_Truong",
  password: "B21DCCN740",
  port: 1893,
});

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

export default client;
