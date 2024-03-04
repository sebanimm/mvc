const {
  USER,
  PASSWORD,
  DATABASE,
  HOST,
  PORT,
  PRODUCTION_USER,
  PRODUCTION_PASSWORD,
  PRODUCTION_DATABASE,
  PRODUCTION_HOST,
  PRODUCTION_PORT,
} = require("../../constants");

const development = {
  "username": USER,
  "password": PASSWORD,
  "database": DATABASE,
  "host": HOST,
  "port": PORT,
  "dialect": "mysql",
};

const test = {
  "username": USER,
  "password": PASSWORD,
  "database": DATABASE,
  "host": HOST,
  "port": PORT,
  "dialect": "mysql",
};

const production = {
  "username": PRODUCTION_USER,
  "password": PRODUCTION_PASSWORD,
  "database": PRODUCTION_DATABASE,
  "host": PRODUCTION_HOST,
  "port": PRODUCTION_PORT,
  "dialect": "mysql",
};

module.exports = { development, test, production };
