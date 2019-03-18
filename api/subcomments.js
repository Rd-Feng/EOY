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

router.get('/subcomments', (req, res) => {
  connection.query('SELECT * FROM subcomments', (err, results) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

router.get('/subcomments/:comment_id', (req, res) => {
  connection.query('SELECT * FROM subcomments WHERE comment_id=' + connection.escape(req.params.comment_id), (err, results) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

router.get('/subcomment/:id', (req, res) => {
  connection.query('SELECT * FROM subcomments WHERE id=' + connection.escape(req.params.id), (err, results) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

module.exports = router;
