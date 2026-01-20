import express from "express";
import { connectToDb } from "./lib/dbConnect.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import roomsRoutes from "./routes/rooms.js";
import hotelsRoutes from "./routes/hotels.js";
dotenv.config();

const app = express();
const PORT = 4000 || process.env.PORT;

app.get("/api/hello", (req, res) => {
  res.send("hellow People");
});

//middleware
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/rooms", roomsRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went Wrong!";
  console.log(errorStatus);
  console.log(errorMessage);
  return res
    .status(errorStatus)
    .json({ success: true, status: errorStatus, message: errorMessage,stack:err.stack});
});

app.listen(PORT, () => {
  connectToDb();
  console.log("Our server is running on the port " + PORT);
});
