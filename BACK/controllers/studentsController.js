import {
  readStudents,
  writeStudent,
} from "../services/studentsService.js";

// ✅ correct export
export const getStudents = async (req, res) => {
  const students = await readStudents();
  res.status(200).json(students);
};

export const addStudent = async (req, res) => {
  const newStudent = req.body;

  const savedStudent = await writeStudent(newStudent);

  res.status(201).json({
    message: "Student added",
    student: savedStudent,
  });
};

import Student from "../models/Student.js";

export const deleteStudent = async (req, res) => {
  console.log("DELETE ID:", req.params.id); // debug

  await Student.findByIdAndDelete(req.params.id);

  res.json({ message: "deleted" });
};

export const updateStudent = async (req, res) => {
  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ message: "Student updated", student: updated });
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};