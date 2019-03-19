const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const connection = (() => {
  return mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'limbo_test',
    connectionLimit: 100
  });
})();

router.get('/bookmarks', (req, res) => {
  const queryString = "SELECT * FROM bookmarks WHERE user_id=" +
    connection.escape(connection.query.user_id)
  connection.query(queryString, (err, results) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      res.json({
        bookmarks: results
      });
    }
  });
})

module.exports = router;
