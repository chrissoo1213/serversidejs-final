import express from "express";
import {
  getcourses,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudentById
} from "../controllers/coursesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/:id", getStudentById);
router.get("/", authMiddleware, getcourses);
router.post("/", authMiddleware, addStudent);
router.delete("/:id", authMiddleware, deleteStudent);
router.put("/:id", authMiddleware, updateStudent);

export default router;