import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import ConnectDB from "./ConnectDB.js";
import dataRouter from "./routes/dataSensor.js";
import controlRouter from "./routes/control.js";

const app = express();
const server = createServer(app);
dotenv.config();
app.use(cors());
app.use(express.json());
ConnectDB();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//route
app.use("/api/data-sensor", dataRouter);
app.use(
  "/api/control",
  (req, res, next) => {
    req.io = io;
    next();
  },
  controlRouter
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server start at PORT:", PORT);
});

server.listen(8081);
