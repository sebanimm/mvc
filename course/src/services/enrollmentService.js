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
    (select number, name, gender
      from student 
      where number=${number} and name=${name} and gender=${gender});`;
    await this.executeQuery(sql);
  }

  async getAllCourses() {
    const sql = "select * from course;";
    return await this.executeQuery(sql);
  }

  async createCourse(name, professor, credit) {
    const sql = `insert into course(name, professor, credit)
    select '${name}', '${professor}', ${credit}
    from dual 
    where not exists 
    (select name, professor, credit
      from enrollment 
      where name='${name}', professor='${professor}', credit=${credit});`;
    await this.executeQuery(sql);
  }

  async getAllEnrollments() {
    const sql = `select s.number as student_number, s.name as student_name, c.name as course_name, c.professor, c.credit
    from student s, course c, enrollment e
    where e.studentId = s.id and e.courseId = c.id;`;
    return await this.executeQuery(sql);
  }

  async createEnrollment(studentId, courseId) {
    const sql = `insert into enrollment(studentId, courseId) 
    select ${studentId}, ${courseId}
    from dual 
    where not exists 
    (select studentId, courseId
      from enrollment 
      where studentId=${studentId} and courseId=${courseId});`;
    await this.executeQuery(sql);
  }

  async cancelEnrollment(enrollmentId) {
    const sql = `delete from enrollment where id=${enrollmentId}`;
    await this.executeQuery(sql);
  }
}

module.exports = ReservationService;
