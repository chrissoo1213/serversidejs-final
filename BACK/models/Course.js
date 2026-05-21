import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  teacher: String,
  credits: Number,
  description: String,
});

export default mongoose.models.Course ||
  mongoose.model("Course", courseSchema);