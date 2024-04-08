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
  const { name, credit } = req.body;
  await enrollmentService.createCourse(name, credit);
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
  let a = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];
  for (const lecture of lectures) {
    if (lecture.day === "2025년 3월 5일") continue;

    let count = 0;
    if (lecture.start_time.substring(0, 1) === "9") a[0][lecture.day] = lecture;
    else if (lecture.start_time.substring(0, 2) === "10") {
      count = 1;
      a[1][lecture.day] = `${lecture.course_name}/${lecture.professor_name}`;
    } else if (lecture.start_time.substring(0, 2) === "11") {
      count = 2;
      a[2][lecture.day] = `${lecture.course_name}/${lecture.professor_name}`;
    } else if (lecture.start_time.substring(0, 2) === "12") {
      count = 3;
      a[3][lecture.day] = `${lecture.course_name}/${lecture.professor_name}`;
    } else if (lecture.start_time.substring(0, 2) === "13") {
      count = 4;
      a[4][lecture.day] = `${lecture.course_name}/${lecture.professor_name}`;
    } else if (lecture.start_time.substring(0, 2) === "14") {
      count = 5;
      a[5][lecture.day] = `${lecture.course_name}/${lecture.professor_name}`;
    } else if (lecture.start_time.substring(0, 2) === "15") {
      count = 6;
      a[6][lecture.day] = `${lecture.course_name}/${lecture.professor_name}`;
    }

    for (let i = count; i < lecture.credit + count; i++) {
      if (i >= 7) break;
      a[i][lecture.day] = `${lecture.course_name}/${lecture.professor_name}`;
    }
  }
  res.send(a);
});

router.get("/timetable/professor/:name", async (req, res) => {
  const { name } = req.params;
  const lectures = await enrollmentService.getTeacherLecture(name);
  let a = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];
  for (const lecture of lectures) {
    if (lecture.day === "2025년 3월 5일") continue;

    let count = 0;
    if (lecture.start_time.substring(0, 1) === "9") a[0][lecture.day] = lecture;
    else if (lecture.start_time.substring(0, 2) === "10") {
      count = 1;
      a[1][lecture.day] = `${lecture.course_name}/${lecture.student_name}`;
    } else if (lecture.start_time.substring(0, 2) === "11") {
      count = 2;
      a[2][lecture.day] = `${lecture.course_name}/${lecture.student_name}`;
    } else if (lecture.start_time.substring(0, 2) === "12") {
      count = 3;
      a[3][lecture.day] = `${lecture.course_name}/${lecture.student_name}`;
    } else if (lecture.start_time.substring(0, 2) === "13") {
      count = 4;
      a[4][lecture.day] = `${lecture.course_name}/${lecture.student_name}`;
    } else if (lecture.start_time.substring(0, 2) === "14") {
      count = 5;
      a[5][lecture.day] = `${lecture.course_name}/${lecture.student_name}`;
    } else if (lecture.start_time.substring(0, 2) === "15") {
      count = 6;
      a[6][lecture.day] = `${lecture.course_name}/${lecture.student_name}`;
    }

    for (let i = count; i < lecture.credit + count; i++) {
      if (i >= 7) break;
      a[i][lecture.day] = `${lecture.course_name}/${lecture.student_name}`;
    }
  }
  res.send(a);
});

router.post("/register_enrollment", async (req, res) => {
  if (!req.body) res.redirect("/enrollment_management");
  const { student_id, lecture_id } = req.body;
  const [{ courseId }] = await enrollmentService.getCourseId(lecture_id);
  console.log(student_id, courseId, lecture_id);
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
