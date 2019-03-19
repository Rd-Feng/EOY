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

router.get('/connection/:id', (req, res) => {
  connection.query(`SELECT * FROM connections WHERE id=${connection.escape(req.params.id)}`, (err, results) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      res.send({data: results});
    }
  });
});

router.get('/connections/:user_id', (req, res) => {
  connection.query(`SELECT * FROM connections WHERE user_id=${connection.escape(req.params.user_id)}`, (err, results) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      res.send({data: results});
    }
  });
});

router.post('/connections/connect', (req, res) => {
  const { user_id, f_id } = req.body;
  connection.query(`INSERT INTO connections (user_id, f_id) VALUES (${connection.escape(user_id)}, ${connection.escape(f_id)})`, (err) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      res.send({status: 'success'});
    }
  });
});

router.post('/connections/disconnect', (req, res) => {
  const { user_id, f_id } = req.body;
  connection.query(`DELETE FROM connections WHERE user_id=${connection.escape(user_id)} and f_id=${connection.escape(f_id)}`, (err) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      res.send({status: 'success'});
    }
  });
});

module.exports = router;
