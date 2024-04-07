const express = require("express");
const { VIEW_DIRECTORY } = require("../constants");
const EnrollmentService = require("../services/enrollmentService");
const enrollmentService = new EnrollmentService();
const router = express.Router();
const print = console.log;
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
  const lectures = await enrollmentService.getAllLectures();
  const enrollments = await enrollmentService.getAllEnrollments();
  res.render(`${VIEW_DIRECTORY}/enrollment_management`, {
    students,
    lectures,
    enrollments,
  });
});

router.get("/timetable/student/:name", async (req, res) => {
  const { name } = req.params;
  const lectures = await enrollmentService.getStudentLecture(name);
  let a = [[], [], [], [], []];
  for (const lecture of lectures) {
    if (lecture.day === "2025년 3월 5일") continue;
    a[lecture.day].push(lecture);
  }
  for (let i = 0; i < 5; i++) {
    a[i].sort(function (a, b) {
      const aa = parseInt(a.start_time.substring(0, 2)) + a.credit;
      const bb = parseInt(b.start_time.substring(0, 2)) + b.credit;
      if (aa > bb) {
        return 1;
      }
      if (aa < bb) {
        return -1;
      }
      return 0;
    });
  }
  res.send(a);
});

router.get("/timetable/professor/:name", async (req, res) => {
  const { name } = req.params;
  const lectures = await enrollmentService.getTeacherLecture(name);
  let a = [[], [], [], [], []];
  for (const lecture of lectures) {
    if (lecture.day === "2025년 3월 5일") continue;
    a[lecture.day].push(lecture);
  }
  for (let i = 0; i < 5; i++) {
    a[i].sort(function (a, b) {
      const aa = parseInt(a.start_time.substring(0, 2)) + a.credit;
      const bb = parseInt(b.start_time.substring(0, 2)) + b.credit;
      if (aa > bb) {
        return 1;
      }
      if (aa < bb) {
        return -1;
      }
      return 0;
    });
  }
  res.send(a);
});

router.post("/register_enrollment", async (req, res) => {
  if (!req.body) res.redirect("/enrollment_management");
  const { student_id, lecture_id } = req.body;
  const [{ courseId }] = await enrollmentService.getCourseId(lecture_id);
  await enrollmentService.createEnrollment(student_id, courseId, lecture_id);
  res.redirect("/enrollment_management");
});

router.post("/cancel_enrollment", async (req, res) => {
  if (!req.body) res.redirect("/enrollment_management");
  const { enrollment_id } = req.body;
  await enrollmentService.cancelEnrollment(enrollment_id);
  res.redirect("/enrollment_management");
});

router.get("/professor_management", async (req, res) => {
  const professors = await enrollmentService.getAllProfessors();
  res.render(`${VIEW_DIRECTORY}/professor_management`, { professors });
});

router.post("/register_professor", async (req, res) => {
  if (!req.body) res.redirect("/professor_management");
  const { name, major, email } = req.body;
  await enrollmentService.createProfessor(name, major, email);
  res.redirect("/professor_management");
});

router.get("/lecture_management", async (req, res) => {
  const professors = await enrollmentService.getAllProfessors();
  const courses = await enrollmentService.getAllCourses();
  const lectures = await enrollmentService.getAllLectures();
  res.render(`${VIEW_DIRECTORY}/lecture_management`, {
    professors,
    courses,
    lectures,
  });
});

router.post("/register_lecture", async (req, res) => {
  if (!req.body) res.redirect("/lecture_management");
  const { professor_id, course_id, day, start_time, end_time } = req.body;
  await enrollmentService.createLecture(
    professor_id,
    course_id,
    day,
    start_time,
    end_time,
  );
  res.redirect("/lecture_management");
});

router.post("/cancel_lecture", async (req, res) => {
  if (!req.body) res.redirect("/lecture_management");
  const { lecture_id } = req.body;
  await enrollmentService.cancelEnrollment(lecture_id);
  res.redirect("/lecture_management");
});

module.exports = router;
