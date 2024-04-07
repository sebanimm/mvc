const mysql = require("mysql2/promise");
const { ENV } = require("../constants");
const config = require("./config")[ENV || "development"];

module.exports = mysql.createPool(config);
