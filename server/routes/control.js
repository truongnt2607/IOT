import { Router } from "express";
import { controlDeviceController } from "../controller/index.js";

const router = Router();

router.post("/", controlDeviceController.postControlHistory);

router.get("/", controlDeviceController.getControlHistory);

router.get("/now", controlDeviceController.getCurrentStatus);

export default router;
