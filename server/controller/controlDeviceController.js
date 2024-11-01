import Control from "../models/Control.js";
import client from "../ConnectMQTT.js";
import getCurrentTime from "./getCurrentTime.js";

const pageSize = 10;

const getControlHistory = async (req, res) => {
  let { page = 1, keyword, field, sortField, sortOrder } = req.query;
  page = parseInt(page) < 1 ? 1 : parseInt(page);
  try {
    let query = {};
    if (keyword) {
      if (field) {
        if (["device", "action", "time"].includes(field)) {
          query[field] = { $regex: keyword.replace(/-/g, " "), $options: "i" };
        } else if (field === "_id") {
          query[field] = parseInt(keyword);
        }
        console.log(query);
      } else {
        query = {
          $or: [
            { id: parseInt(keyword) },
            { device: { $regex: keyword.replace(/-/g, " "), $options: "i" } },
            { action: { $regex: keyword.replace(/-/g, " "), $options: "i" } },
            { time: { $regex: keyword.replace(/-/g, " "), $options: "i" } },
          ],
        };
      }
    }
    let sort = {};
    if (sortField && sortOrder) {
      sort[sortField] = sortOrder === "desc" ? -1 : 1;
    }
    const totalData = await Control.countDocuments(query);
    const totalPage = Math.ceil(totalData / pageSize);
    const data = await Control.find(query)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      data: [...data],
      currentPage: page,
      totalPage: totalPage,
      totalData: totalData,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xử lý yêu cầu", error });
  }
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
  const newControl = new Control({
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

export default {
  postControlHistory,
  getCurrentStatus,
  getControlHistory,
};
