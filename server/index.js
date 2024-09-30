import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/control.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server start at PORT:", PORT);
});
