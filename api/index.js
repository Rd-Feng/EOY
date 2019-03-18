const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const schedule = require('node-schedule');
const {OAuth2Client} = require('google-auth-library');
const request = require('request');
const CLIENT_ID = '959614478231-rhsbohn77k2664h64phq1v128lqp78l9.apps.googleusercontent.com'; /* TODO: put it as env */
const client = new OAuth2Client(CLIENT_ID);
let ARTICLE_TODAY = '19420532';

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
app.use(require('./comments'));
app.use(require('./subcomments'));
app.use(require('./users'));
app.use(require('./likes'));

// const TEST = schedule.scheduleJob('0 * * * * *', () => {
//   const GET_PAST_ITEMS = 'SELECT id FROM items';
//   connection.query(GET_PAST_ITEMS, (err, results) => {
//     if (err) {
//       console.log(err);
//     } else {
//       let history = [];
//       results.map(result => history.push(result.id));
//       request('https://hacker-news.firebaseio.com/v0/topstories.json', (err, response, body) => {
//         if (err) {
//           console.log(err);
//         } else {
//           let top_items = JSON.parse(body);
//           for (let item of top_items) {
//             if (!history.includes(String(item))) {
//               connection.query('INSERT INTO items (id) VALUES (' + connection.escape(String(item)) + ')', (err, results) => {
//                 if (err) {
//                   console.log(err);
//                 } else {
//                   ARTICLE_TODAY = String(item);
//                 }
//               });
//               break;
//             }
//           }
//         }
//       });
//     }
//   })
// });

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
  .then(data => {
    request.get('http://localhost:4000/user/' + data.id, (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        if (!JSON.parse(body).data.length) {
          request.post({
            headers: {'content-type' : 'application/json'},
            url:     'http://localhost:4000/user',
            body:    JSON.stringify(data)
          }, (error, response, body) => {
            console.log('user added:::', data.id);
          });
        } else {
          console.log('user already exists:::', data.id)
        }
      }
    });
    res.send(data)
  })
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

app.get('/article_today', (req, res) => {
  res.send({data: ARTICLE_TODAY});
})

app.get('/items', (req, res) => {
  const GET_ITEMS = 'SELECT * FROM items';
  connection.query(GET_ITEMS, (err, results) => {
    if (err) {
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

app.get('/bookmarks', (req, res) => {
  const GET_BOOKMARKS = 'SELECT * FROM bookmarks';
  connection.query(GET_BOOKMARKS, (err, results) => {
    if (err) {
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

app.get('/comments', (req, res) => {
  const GET_COMMENTS = 'SELECT * FROM comments';
  connection.query(GET_COMMENTS, (err, results) => {
    if (err) {
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

app.get('/subcomments', (req, res) => {
  const GET_SUBCOMMENTS = 'SELECT * FROM subcomments';
  connection.query(GET_SUBCOMMENTS, (err, results) => {
    if (err) {
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

app.get('/connections', (req, res) => {
  const GET_CONNECTIONS = 'SELECT * FROM connections';
  connection.query(GET_CONNECTIONS, (err, results) => {
    if (err) {
      res.send({status: 'failed'});
    } else {
      return res.json({data: results});
    }
  });
});

app.listen(PORT);
