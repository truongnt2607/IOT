import Control from "../models/Control.js";
import client from "../ConnectMQTT.js";
import getCurrentTime from "./getCurrentTime.js";

const getAllControlHistory = async (req, res) => {
  const data = await Control.find({});
  res.status(200).json(data);
};

const getCurrentStatus = async (req, res) => {
  try {
    const latestStates = await Control.aggregate([
      { $sort: { _id: -1 } }, // Sắp xếp theo _id giảm dần (mới nhất trước)
      {
        $group: {
          _id: "$device", // Nhóm theo tên thiết bị
          latestRecord: { $first: "$$ROOT" }, // Lấy toàn bộ bản ghi mới nhất theo _id
        },
      },
      {
        $replaceRoot: { newRoot: "$latestRecord" }, // Thay thế root bằng bản ghi mới nhất
      },
    ]);
    res.status(200).json(latestStates); // Trả về kết quả đã sắp xếp và lọc
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving device states" });
  }
};

const postControlHistory = async (req, res) => {
  const message = req.body;
  const newestControl = await Control.find({}).sort({ _id: -1 }).limit(1);
  const newControl = new Control({
    _id: newestControl[0]._id + 1,
    ...message,
    time: getCurrentTime(),
  });
  client.publish("control_led", JSON.stringify(message), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Publishing to topic: contro_led");
      newControl.save().then(() => {
        req.io.emit("control_update", message);
        res
          .status(200)
          .send("Successfully controlled and notified via Socket.io!");
      });
    }
  });
};

export default { postControlHistory, getAllControlHistory, getCurrentStatus };
