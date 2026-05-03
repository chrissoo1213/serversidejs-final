import express from "express";
import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudentById
} from "../controllers/studentsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/:id", getStudentById);
router.get("/", authMiddleware, getStudents);
router.post("/", authMiddleware, addStudent);
router.delete("/:id", authMiddleware, deleteStudent);
router.put("/:id", authMiddleware, updateStudent);

export default router;