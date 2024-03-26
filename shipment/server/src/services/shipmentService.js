const pool = require("../models/mysql");

class ShipmentService {
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

  async getAllUsers() {
    const sql = "select * from user;";
    return await this.executeQuery(sql);
  }

  async getUserId(name, phone) {
    const sql = `select id from user where name='${name}' and phone='${phone}'`;
    return await this.executeQuery(sql);
  }

  async createUser(name, email, phone) {
    const sql = `insert into user(name, email, phone)
    select '${name}', '${email}', '${phone}'
    from dual 
    where not exists 
    (select name, phone
      from user 
      where name='${name}' and phone='${phone}');`;
    await this.executeQuery(sql);
  }

  async getAllShipments() {
    const sql = "select * from shipment;";
    return await this.executeQuery(sql);
  }

  async createShipment(userId, location, content) {
    const date = new Date();
    const sql = `insert into shipment(userId, location, content, date) values('${userId}', '${location}', '${content}', '${date}');`;
    await this.executeQuery(sql);
  }

  async cancelShipment(shipmentId) {
    const sql = `delete from shipment where id=${shipmentId}`;
    await this.executeQuery(sql);
  }

  async getAllWorkers() {
    const sql = `select * from worker;`;
    return await this.executeQuery(sql);
  }

  async createWorker(name, phone) {
    const sql = `insert into worker(name, phone) 
    select '${name}', '${phone}'
    from dual 
    where not exists 
    (select name, phone
      from worker 
      where name='${name}' and phone='${phone}');`;
    await this.executeQuery(sql);
  }

  async getAllDelivery() {
    const sql = `select * from delivery;`;
    return await this.executeQuery(sql);
  }

  async getSelectedDelivery(userId) {
    const sql = `select * from delivery where userId='${userId}';`;
    return await this.executeQuery(sql);
  }

  async createDelivery(userId, workerId, shipmentId) {
    const sql = `insert into delivery values('${userId}', '${workerId}', '${shipmentId}', '-', 0)`;
    await this.executeQuery(sql);
  }

  async modifyDelivery(userId, workerId, shipmentId, isArrived) {
    const flag = isArrived == 0 ? 1 : 0;
    const date = isArrived == 0 ? new Date() : "-";
    const sql = `update delivery set isArrived=${flag}, date='${date}' where userId='${userId}' and workerId='${workerId}' and shipmentId='${shipmentId}'`;
    await this.executeQuery(sql);
  }
}

module.exports = ShipmentService;
