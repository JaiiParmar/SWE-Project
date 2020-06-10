const config = {
  development: {
    SECRET = "khkj#hkJ$783#7K!!hk72%@8463khjK7#",
    DBLINK = "mongodb://localhost:27017/paper_generator"
  },
  production: {
    SECRET= process.env.MYSECRET,
    DBLINK = process.env.DATABASE_URL
  },
};
module.exports = config;