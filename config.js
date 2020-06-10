
const dotenv = require('dotenv');
dotenv.config();

let config = {
  development: {
    DBLINK: process.env.DATABASE_D,
    SECRET: process.env.MYSECRET,
  },
  production: {
      DBLINK: process.env.DATABASE_URL,
      SECRET:process.env.MYSECRET
  },
};

module.exports = config;