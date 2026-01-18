import mongoose from "mongoose";
export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Connected to MongoDb");
  } catch (error) {
    throw error;
  }

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDb Disconnected");
  });
  mongoose.connection.on("connected", () => {
    console.log("MongoDb connected");
  });
};
