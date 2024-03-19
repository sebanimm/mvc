const express = require("express");
const { VIEW_DIRECTORY } = require("../constants");
const EnrollmentService = require("../services/enrollmentService");
const enrollmentService = new EnrollmentService();
const router = express.Router();

router.get("/", async (req, res) => {
  res.render(`${VIEW_DIRECTORY}/index`);
});

router.get("/student_management", async (req, res) => {
  const data = await enrollmentService.getAllStudents();
  res.render(`${VIEW_DIRECTORY}/student_management`, { students: data });
});

router.post("/register_student", async (req, res) => {
  if (!req.body) res.redirect("/student_management");
  const { number, name, gender } = req.body;
  await enrollmentService.createStudent(number, name, gender);
  res.redirect("/student_management");
});

router.get("/course_management", async (req, res) => {
  const data = await enrollmentService.getAllCourses();
  res.render(`${VIEW_DIRECTORY}/course_management`, { courses: data });
});

router.post("/register_course", async (req, res) => {
  if (!req.body) res.redirect("/course_management");
  const { name, professor, credit } = req.body;
  await enrollmentService.createCourse(name, professor, credit);
  res.redirect("/course_management");
});

router.get("/enrollment_management", async (req, res) => {
  const students = await enrollmentService.getAllStudents();
  const courses = await enrollmentService.getAllCourses();
  const enrollments = await enrollmentService.getAllEnrollments();
  res.render(`${VIEW_DIRECTORY}/enrollment_management`, {
    students,
    courses,
    enrollments,
  });
});

router.post("/register_enrollment", async (req, res) => {
  if (!req.body) res.redirect("/enrollment_management");
  const { student_id, course_id } = req.body;
  await enrollmentService.createEnrollment(student_id, course_id);
  res.redirect("/enrollment_management");
});

router.post("/cancel_enrollment", async (req, res) => {
  if (!req.body) res.redirect("/enrollment_management");
  const { enrollment_id } = req.body;
  await enrollmentService.cancelEnrollment(enrollment_id);
  res.redirect("/enrollment_management");
});

module.exports = router;
