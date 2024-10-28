import DataSensor from "../models/DataSensor.js";

const pageSize = 10;

const get15DataSensor = async (req, res) => {
  const data = await DataSensor.find().sort({ _id: -1 }).limit(15);
  res.status(200).json(data);
};

const getDataSensor = async (req, res) => {
  let { page = 1, keyword, field, sortField, sortOrder } = req.query;
  page = parseInt(page) < 1 ? 1 : parseInt(page);
  try {
    let query = {};
    if (keyword) {
      if (field) {
        if (field === "temperature") {
          query[field] = parseFloat(keyword);
        } else if (["humidity", "id", "dust", "light"].includes(field)) {
          query[field] = parseInt(keyword);
        } else if (field === "time") {
          query[field] = { $regex: keyword.replace(/-/g, " "), $options: "i" };
        }
      } else {
        query = {
          $or: [
            { id: parseInt(keyword) },
            { temperature: parseFloat(keyword) },
            { humidity: parseInt(keyword) },
            { dust: parseInt(keyword) },
            { light: parseInt(keyword) },
            { time: { $regex: keyword.replace(/-/g, " "), $options: "i" } },
          ],
        };
      }
    }
    let sort = {};
    if (sortField && sortOrder) {
      sort[sortField] = sortOrder === "desc" ? -1 : 1;
    }
    const totalData = await DataSensor.countDocuments(query);
    const totalPage = Math.ceil(totalData / pageSize);
    const data = await DataSensor.find(query)
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

export default { get15DataSensor, getDataSensor };
