const dotenv = require('dotenv');
dotenv.config();

let config = {
    development: {
        DBLINK : process.env.DATABASE_D
    },
    production: {
        DBLINK : process.env.DATABASE_P
    }
};

module.exports = config;