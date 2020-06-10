const dotenv = require('dotenv');
dotenv.config();
const config = {
  development: {
    DBLINK : process.env.DATABASE_D,
    SECRET : process.env.MYSECRET
  },
  production: {
    SECRET:process.env.MYSECRET,
    DBLINK : process.env.DATABASE_URL
  },
};
module.exports = config;