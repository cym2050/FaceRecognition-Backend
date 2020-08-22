const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl : {
      rejectUnauthorized : false
    }
  }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working')})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, knex)})
app.put('/image', (req, res) => { image.handleImage(req, res, knex)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})


/*
/ --> res = this is working
/sign --> POST = success/fail
/register --> POST = user
/profile --> GET = user
/image --> PUT = user
*/
// console.log(knex.select('*').from('users'));