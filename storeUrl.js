const db = require("./dbConn");
const config = require("./config");

const storeUrl = async ({chapterId, url, description}) => {
 try {
   url = `${config.apiEndpoint}/${url}`
   const sql = `INSERT into ${config.mysqlTable} (chapter_id, url, description) VALUES(${chapterId}, ${url}, ${description})`
   await db.query(sql)
   return;
 } catch (error) {
   console.error(error);
   return;
 }
 
}

module.exports = storeUrl;