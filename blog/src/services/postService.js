const pool = require("../models/mysql");

class PostService {
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

  async findAllPosts() {
    const sql = "select * from posts;";
    return await this.executeQuery(sql);
  }

  async findOnePost(postId) {
    const sql = `select * from posts where postId=${postId}`;
    return await this.executeQuery(sql);
  }

  async updatePost(postId, title, content, author) {
    const date = new Date();
    const sql = `update posts set title='${title}', content='${content}', author='${author}', date='${date}' where postId=${postId};`;
    return await this.executeQuery(sql);
  }

  async createPost(title, content, author) {
    const date = new Date();
    const sql = `insert into posts(title, content, author, date) values('${title}', '${content}', '${author}', '${date}');`;
    return await this.executeQuery(sql);
  }

  async deletePost(postId) {
    const sql = `delete from posts where postId=${postId};`;
    return await this.executeQuery(sql);
  }
}

module.exports = PostService;
