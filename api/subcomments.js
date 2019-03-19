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
  connection.query('SELECT * FROM subcomments ORDER BY created_at', (err, results) => {
    if (err) {
      console.log(err);
      res.send({ status: 'failed' });
    } else {
      return res.json({ data: results });
    }
  });
});

router.get('/subcomments/:comment_id', (req, res) => {
  connection.query('SELECT * FROM subcomments WHERE comment_id=' + connection.escape(req.params.comment_id + ' ORDER BY created_at'), (err, results) => {
    if (err) {
      console.log(err);
      res.send({ status: 'failed' });
    } else {
      return res.json({ data: results });
    }
  });
});

router.get('/subcomment/:id', (req, res) => {
  connection.query('SELECT * FROM subcomments WHERE id=' + connection.escape(req.params.id), (err, results) => {
    if (err) {
      console.log(err);
      res.send({ status: 'failed' });
    } else {
      return res.json({ data: results });
    }
  });
});

router.post('/subcomment', (req, res) => {
  const { text, creator, comment_id } = req.body;
  connection.query('INSERT INTO subcomments (text, creator, comment_id) VALUES (' +
    connection.escape(text) + ', ' +
    connection.escape(creator) + ', ' +
    connection.escape(comment_id) + ')', (err, results) => {
      if (err) {
        console.log(err);
        return res.json({ status: 'failed' });
      } else {
        connection.query('UPDATE comments SET sub_count=sub_count+1 WHERE id=' + connection.escape(comment_id), (err) => {
          if (err) {
            console.log(err);
            res.send({ status: 'failed' });
          } else {
            res.send({ status: 'success' });
          }
        });
      }
    });
});

module.exports = router;
