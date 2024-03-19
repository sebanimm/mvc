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

  async getAllReservations() {
    const sql = `select res.id, u.name, u.email, u.phone, u.num, u.datetime, r.name as restaurantName
    from reservation res, user u, restaurant r
    where res.restaurantId = r.id and u.id = res.userId;`;
    return await this.executeQuery(sql);
  }

  async getAllSelectedReservations(name) {
    const sql = `select res.id, u.name, u.email, u.phone, res.num, res.datetime, r.name as restaurantName
    from reservation res, user u, restaurant r
    where res.restaurantId = r.id and u.id = res.userId
    having u.name = '${name}';`;
    return await this.executeQuery(sql);
  }

  async getAllRestaurants() {
    const sql = "select * from restaurant";
    return await this.executeQuery(sql);
  }

  async createReservation(name, restaurantId, num, datetime) {
    const [{ id }] = await this.executeQuery(
      `select id from user where name='${name}';`,
    );
    const sql = `insert into reservation(userId, restaurantId, num, datetime) values(${id}, ${restaurantId}, ${num}, '${datetime}');`;
    await this.executeQuery(sql);
  }

  async createUser(name, email, phone) {
    const sql = `insert into user(name, email, phone) 
    select '${name}', '${email}', '${phone}'
    from dual 
    where not exists 
    (select name, email, phone
      from user 
      where name='${name}');`;
    await this.executeQuery(sql);
  }

  async deleteUser(userId) {
    const sql = `delete from user where id=${userId};`;
    return await this.executeQuery(sql);
  }
}

module.exports = ReservationService;
