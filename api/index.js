const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '959614478231-rhsbohn77k2664h64phq1v128lqp78l9.apps.googleusercontent.com'; /* TODO: put it as env */
const client = new OAuth2Client(CLIENT_ID);

const app = express();
const PORT = process.env.PORT || 4000
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

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/verify', (req, res) => {
  const { token } = req.body;
  client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
  })
  .then(ticket => data = ticket.getPayload())
  .then(data => data = {
    id: data.sub,
    first_name: data.given_name,
    last_name: data.family_name,
    email: data.email,
    img_url: data.picture
  })
  .then(data => res.send(data))
  .catch(err => res.send({err: 'Invalid token'}))
});

app.get('/', (req, res) => {
  res.send(`Hello from port ${PORT}`)
});

app.get('/users', (req, res) => {
  const GET_USERS = 'SELECT * FROM users';
  connection.query(GET_USERS, (err, results) => {
    if (err) {
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

app.get('/items', (req, res) => {
  const GET_USERS = 'SELECT * FROM items';
  connection.query(GET_USERS, (err, results) => {
    if (err) {
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

app.get('/bookmarks', (req, res) => {
  const GET_USERS = 'SELECT * FROM bookmarks';
  connection.query(GET_USERS, (err, results) => {
    if (err) {
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

app.get('/comments', (req, res) => {
  const GET_USERS = 'SELECT * FROM comments';
  connection.query(GET_USERS, (err, results) => {
    if (err) {
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

app.get('/subcomments', (req, res) => {
  const GET_USERS = 'SELECT * FROM subcomments';
  connection.query(GET_USERS, (err, results) => {
    if (err) {
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

app.get('/connections', (req, res) => {
  const GET_USERS = 'SELECT * FROM connections';
  connection.query(GET_USERS, (err, results) => {
    if (err) {
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

app.listen(PORT);
