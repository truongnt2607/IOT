import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import ConnectDB from "./ConnectDB.js";
import dataRouter from "./routes/dataSensor.js";
import controlRouter from "./routes/control.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
ConnectDB();

//route
app.use("/api/data-sensor", dataRouter);
app.use("/api/control", controlRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server start at PORT:", PORT);
});
