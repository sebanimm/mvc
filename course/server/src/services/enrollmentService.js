const pool = require("../models/mysql");

class ReservationService {
  async executeQuery(sql) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(sql);
      connection.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getAllStudents() {
    const sql = "select * from student;";
    return await this.executeQuery(sql);
  }

  async createStudent(number, name, gender) {
    const sql = `insert into student(number, name, gender)
    select ${number}, '${name}', '${gender}'
    from dual 
    where not exists 
    (select number, gender
      from student 
      where number=${number} and gender='${gender}');`;
    await this.executeQuery(sql);
  }

  async getAllCourses() {
    const sql = "select * from course;";
    return await this.executeQuery(sql);
  }

  async getCourseId(lectureId) {
    const sql = `select courseId from lecture where id=${lectureId}`;
    return await this.executeQuery(sql);
  }

  async createCourse(name, credit) {
    const sql = `insert into course(name, credit)
    select '${name}', ${credit}
    from dual 
    where not exists 
    (select name, credit
      from course 
      where name='${name}' and credit=${credit});`;
    await this.executeQuery(sql);
  }

  async getAllEnrollments() {
    const sql = `select s.number as student_number, s.name as student_name, c.name as course_name, p.name as professor_name, c.credit
    from student s, course c, enrollment e, professor p
    where e.studentId = s.id and e.courseId = c.id and e.lectureId = p.id;`;
    return await this.executeQuery(sql);
  }

  async createEnrollment(studentId, courseId, lectureId) {
    const sql = `insert into enrollment(studentId, courseId, lectureId) 
    select ${studentId}, ${courseId}, ${lectureId}
    from dual 
    where not exists 
    (select studentId, lectureId, courseId
      from enrollment 
      where studentId=${studentId} and lectureId=${lectureId} and courseId=${courseId});`;
    await this.executeQuery(sql);
  }

  async cancelEnrollment(enrollmentId) {
    const sql = `delete from enrollment where id=${enrollmentId}`;
    await this.executeQuery(sql);
  }

  async getAllProfessors() {
    const sql = "select * from professor;";
    return await this.executeQuery(sql);
  }

  async createProfessor(name, major, email) {
    const sql = `insert into professor(name, major, email)
    select '${name}', '${major}', '${email}'
    from dual 
    where not exists 
    (select name, major
      from professor 
      where name='${name}' and major='${major}');`;
    await this.executeQuery(sql);
  }

  async getAllLectures() {
    const sql = `select l.id, c.id as courseId, c.name as course_name, p.name as professor_name, p.major as professor_major, c.credit, l.day, l.startTime as start_time, l.endTime as end_time
    from course c, professor p, lecture l
    where l.professorId = p.id and l.courseId = c.id`;
    return await this.executeQuery(sql);
  }

  async getStudentLecture(name) {
    const sql = `select s.name, l.id, c.id as courseId, c.name as course_name, p.name as professor_name, p.major as professor_major, c.credit, l.day, l.startTime as start_time, l.endTime as end_time
    from course c, professor p, lecture l, student s
    where l.professorId = p.id and l.courseId = c.id
    having s.name='${name}'`;
    return await this.executeQuery(sql);
  }

  async getTeacherLecture(name) {
    const sql = `select s.name as student_name, l.id, c.id as courseId, c.name as course_name, p.name as professor_name, p.major as professor_major, c.credit, l.day, l.startTime as start_time, l.endTime as end_time
    from course c, professor p, lecture l, student s, enrollment e
    where l.professorId = p.id and l.courseId = c.id and e.studentId = s.id
    having p.name='${name}';`;
    return await this.executeQuery(sql);
  }

  async createLecture(professorId, courseId, day, startTime, endTime) {
    const sql = `insert into lecture(professorId, courseId, day, startTime, endTime)
      select '${professorId}', '${courseId}', '${day}', '${startTime}', '${endTime}'
      from dual 
      where not exists 
      (select professorId, courseId, day, startTime, endTime
        from lecture 
        where professorId='${professorId}' and courseId='${courseId}' and day='${day}' and startTime='${startTime}' and endTime='${endTime}');`;
    await this.executeQuery(sql);
  }

  async cancelLecture(lectureId) {
    const sql = `delete from lecture where id=${lectureId}`;
    await this.executeQuery(sql);
  }
}

module.exports = ReservationService;
