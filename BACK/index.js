import express from "express";
import mongoose from "mongoose";
import studentRoutes from "./routes/studentsRoute.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.json({ msg: "API is running" });
});

app.use("/students", studentRoutes);
app.use("/auth", authRoutes);

// MongoDB connection
mongoose
  .connect("mongodb+srv://testuser:test123@cluster0.krzx6pw.mongodb.net/studentsDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});