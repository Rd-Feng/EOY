const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const connection = (() => {
  return mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'limbo_test',
    connectionLimit: 100
  });
})();

router.get('/comment/:id/like', (req, res) => {
  connection.query('UPDATE comments SET likes=likes+1 WHERE id=' + connection.escape(req.params.id), (err) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      res.send({status: 'success', query: 'I am liking comment:::', 'UPDATE comments SET likes=likes+1 WHERE id=' + connection.escape(req.params.id)});
    }
  });
});

router.get('/comment/:id/unlike', (req, res) => {
  connection.query('UPDATE comments SET likes=likes-1 WHERE id=' + connection.escape(req.params.id), (err) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      res.send({status: 'success', query: 'I am liking comment:::', 'UPDATE comments SET likes=likes+1 WHERE id=' + connection.escape(req.params.id)});
    }
  });
});

router.get('/subcomment/:id/like', (req, res) => {
  connection.query('UPDATE subcomments SET likes=likes+1 WHERE id=' + connection.escape(req.params.id), (err) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      res.send({status: 'success'});
    }
  });
});

router.get('/subcomment/:id/unlike', (req, res) => {
  connection.query('UPDATE subcomments SET likes=likes-1 WHERE id=' + connection.escape(req.params.id), (err) => {
    if (err) {
      console.log(err);
      res.send({status: 'failed'});
    } else {
      res.send({status: 'success'});
    }
  });
});

module.exports = router;
