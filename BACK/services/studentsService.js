import Student from "../models/Student.js";

// ✅ get all students
export const readStudents = async () => {
  return await Student.find();
};

// ✅ create a new student
export const writeStudent = async (student) => {
  return await Student.create(student);
};