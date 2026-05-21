import express from "express";

import {
  getCourses,
  addCourse,
  deleteCourse,
  updateCourse,
} from "../controllers/coursesController.js";

const router = express.Router();

router.get("/", getCourses);
router.post("/", addCourse);
router.delete("/:id", deleteCourse);
router.put("/:id", updateCourse);

export default router;