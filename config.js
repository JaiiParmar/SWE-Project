const dotenv = require('dotenv');
dotenv.config();

let config = {
  development: {
    DBLINK: process.env.DATABASE_D,
  },
  production: {
    DBLINK: process.env.DATABASE_URL,
  },
};

module.exports = config;