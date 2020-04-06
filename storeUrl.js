const db = require("./dbConn");
const config = require("./config");

const storeUrl = async ({chapterId = null, url = null, description = null}) => {
 try {
   url = `${config.apiEndpoint}/${url}`
   const sql = `INSERT into ${config.mysqlDb}.${config.mysqlTable} (chapter_id, url, description) VALUES(${chapterId}, "${url}", ${description})`
   console.log(sql)
   await db.query(sql)
   process.exit(0);
 } catch (error) {
   console.error(error);
   process.exit(0);
 }
 
}

module.exports = storeUrl;