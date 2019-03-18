const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '959614478231-rhsbohn77k2664h64phq1v128lqp78l9.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const app = express();
const PORT = process.env.PORT || 4000
// const connection = getConnection();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/signin', (req, res) => {
  const { token } = req.body;
  console.log(token);
  let data;
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

app.listen(PORT);
