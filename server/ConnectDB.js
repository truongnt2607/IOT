import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connect to MongoDB sussesfully!");
  } catch (err) {
    console.log("Error to connect MongoDB. Error: ", err);
  }
};

export default ConnectDB;
