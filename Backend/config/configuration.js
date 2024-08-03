
'user strict';
 
const mysql = require('mysql2/promise');


const dbConn = mysql.createPool({
  host: "103.228.83.115",
  user: "Kodiemysql",
  database: "inventory_system",
  password: "Cylsys@Kodie@2",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// dbConn.connect(function(err) {
//   if (err) throw err;
//   console.log("Database Connected successfully");
// });
module.exports = dbConn;