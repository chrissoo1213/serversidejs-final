import Course from "../models/Course.js";

export const getCoursesService = async () => {
  return await Course.find();
};

export const addCourseService = async (data) => {
  return await Course.create(data);
};