const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

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

router.get('/comments/:item_id', (req, res) => {
  console.log('SELECT * FROM comments WHERE item_id=' + connection.escape(req.params.item_id))
  connection.query('SELECT * FROM comments WHERE item_id=' + connection.escape(req.params.item_id), (err, results) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

router.get('/comment/:id', (req, res) => {
  connection.query('SELECT * FROM comments WHERE id=' + connection.escape(req.params.id), (err, results) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

module.exports = router;
