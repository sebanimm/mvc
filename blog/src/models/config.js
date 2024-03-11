const {
  DEVELOPMENT_USER,
  DEVELOPMENT_PASSWORD,
  DEVELOPMENT_DATABASE,
  DEVELOPMENT_HOST,
  PRODUCTION_USER,
  PRODUCTION_PASSWORD,
  PRODUCTION_DATABASE,
  PRODUCTION_HOST,
} = require("../constants");

const development = {
  "host": DEVELOPMENT_HOST,
  "user": DEVELOPMENT_USER,
  "password": DEVELOPMENT_PASSWORD,
  "database": DEVELOPMENT_DATABASE,
  "connectTimeout": 5000,
};

const test = {
  "host": DEVELOPMENT_HOST,
  "user": DEVELOPMENT_USER,
  "password": DEVELOPMENT_PASSWORD,
  "database": DEVELOPMENT_DATABASE,
  "connectTimeout": 5000,
};

const production = {
  "host": PRODUCTION_HOST,
  "user": PRODUCTION_USER,
  "password": PRODUCTION_PASSWORD,
  "database": PRODUCTION_DATABASE,
  "connectTimeout": 5000,
};

module.exports = { development, test, production };
