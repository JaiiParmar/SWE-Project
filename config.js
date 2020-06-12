const dotenv = require('dotenv');
dotenv.config();
const config = {
  development: {
    DBLINK : process.env.DATABASE_D,
    SECRET: process.env.MYSECRET,
    GMAIL: process.env.GID,
    GPASSWORD: process.env.GPASS
  },
  production: {
    SECRET :process.env.MYSECRET,
    DBLINK: process.env.DATABASE_URL,
    GMAIL: process.env.GID,
    GPASSWORD: process.env.GPASS
  },
};
module.exports = config;