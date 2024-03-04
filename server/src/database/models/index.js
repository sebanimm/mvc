"use strict";

const Sequelize = require("sequelize");
const { ENV } = require("../../constants");
const config = require("../config")[ENV];
const { database, username, password } = config;

const Todo = require("./todo");

const sequelize = new Sequelize(database, username, password, config);

const db = {};

db.Todo = Todo(sequelize, Sequelize);

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
