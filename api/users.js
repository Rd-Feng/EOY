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

router.get('/user/:id', (req, res) => {
  connection.query('SELECT * FROM users WHERE id=' + connection.escape(req.params.id), (err, results) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

router.post('/user', (req, res) => {
  const { id, first_name, last_name, email, img_url } = req.body;
  connection.query('INSERT INTO users (id, first_name, last_name, email, img_url) VALUES (' +
                    connection.escape(id) + ', ' +
                    connection.escape(first_name) + ', ' +
                    connection.escape(last_name) + ', ' +
                    connection.escape(email) + ', ' +
                    connection.escape(img_url) + ')', (err, results) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      return res.json({status: 'success'});
    }
  });
});

router.put('/user', (req, res) => {
  const { id,  github, linkedin, twitter } = req.body;
  connection.query('UPDATE users SET github=' + connection.escape(github) +
                                  ', linkedin=' + connection.escape(linkedin) +
                                  ', twitter=' + connection.escape(twitter) +
                                  ' WHERE id=' + connection.escape(id), (err) => {
    if (err) {
      res.send({status: 'failed'});
    } else {
      res.send({status: 'success'});
    }
  });
});

module.exports = router;
