const mysql = require('@mysql/xdevapi');
const config = require("./config");
let conn = null;

const init = async () => {  
  conn = await mysql.getSession({
    host: config.mysqlHost,
    port: config.mysqlPort,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDb,
  });
  return conn;
}

const query = async (query) => {
  return conn.sql(query).execute();
}

module.exports = { init, query }