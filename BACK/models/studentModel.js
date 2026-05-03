import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  major: String,
  gpa: Number,
});

const Student = mongoose.model("Student", studentSchema);

export default Student;