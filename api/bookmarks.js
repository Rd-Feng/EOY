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

router.get('/bookmarks/:user_id', (req, res) => {
  connection.query(`SELECT * FROM bookmarks WHERE user_id=${req.params.user_id}`, (err, results) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      res.json({data: results});
    }
  });
});

module.exports = router;
