const pool = require("../database/mysql");

class TodoService {
  async findAllTodos() {
    const sql = "select * from todo;";
    const connection = await pool.getConnection();
    const [result] = await connection.query(sql);
    connection.release();
    return result;
  }

  async updateTodo(todoId, isFinished) {
    const sql = `update todo set isFinished=${isFinished} where todoId=${todoId};`;
    const connection = await pool.getConnection();
    const [result] = await connection.query(sql);
    connection.release();
    return result;
  }

  async createTodo(todo) {
    const sql = `insert into todo(todo, isFinished) values('${todo}', false);`;
    const connection = await pool.getConnection();
    const [result] = await connection.query(sql);
    connection.release();
    return result;
  }

  async deleteTodo(todoId) {
    const sql = `delete from todo where todoId=${todoId};`;
    const connection = await pool.getConnection();
    const [result] = await connection.query(sql);
    connection.release();
    return result;
  }
}

module.exports = TodoService;
