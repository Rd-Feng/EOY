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

router.get('/comments/:item_id', (req, res) => {
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

router.post('/comment', (req, res) => {
  const { text, creator, item_id } = req.body;
  connection.query('INSERT INTO comments (text, creator, item_id) VALUES (' +
                    connection.escape(text) + ', ' +
                    connection.escape(creator) + ', ' +
                    connection.escape(item_id) +')', (err, results) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      return res.json({status: 'success'});
    }
  });
});

module.exports = router;
