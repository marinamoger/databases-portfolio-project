/*
* Project Name: Old Mike’s Car Full-Service Transaction Management System
* Project Group: 45
* Group Members: Lei Feng, Marina Moger
* Description: Connect to the database.
* Citation:
* Date: 11/03/2025
* Code in this document is adapted from Canvas Course Module.
* Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
*/

// Get a MySQL databasse instance
let mysql = require('mysql2');

// Create a "connection pool"
const pool = mysql.createPool({
  waitForConnections: true,
  connectionLimit   : 10,
  host              : 'classmysql.engr.oregonstate.edu',
  user              : 'cs340_[your_onid]',
  password          : '[your_db_password]',
  database          : 'cs340_[your_onid]'
}).promise();

module.exports = pool;
