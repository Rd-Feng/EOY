const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const mysql = require('mysql');
// const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 4000
// const connection = getConnection();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// function getConnection (){
//   return mysql.createPool({
//     host: '13.59.49.78',
//     port: 3306,
//     user: 'test',
//     password: 'test',
//     database: 'devtest',
//     connectionLimit: 100
//   })
// }

app.get('/', (req, res) => {
  res.send(`Hello from port ${PORT}`)
})

app.listen(PORT);
