const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '0',
			name: 'john',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '1',
			name: 'sally',
			email: 'sally@gmail.com',
			password: 'apple',
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req,res) => {
	bcrypt.compare("ann", '$2a$10$HkjSn/.FyUEhgYOOpB73Be7Epn5QI0AB9ysqQPLlJOhNF5hfM.GoS', function(err, res) {
		console.log('first guess',res);
	});
	bcrypt.compare("veggies", '$2a$10$HkjSn/.FyUEhgYOOpB73Be7Epn5QI0AB9ysqQPLlJOhNF5hfM.GoS', function(err, res) {
		console.log('second guess',res);
	});
	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		res.json('success')
	} else {
		res.status(400).json('fail')
	}
})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
	});
	database.users.push({
		id: '2',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user) ;
		}
	})
	if (!found) {
		res.status(404).json('No such user');
	}
})

app.put('/images', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries) ;
		}
	})
	if (!found) {
		res.status(404).json('No such user');
	}
})
 

app.listen(3000, () => {
	console.log('app is running on port 3000')
})


/*
/ --> res = this is working
/sign --> POST = success/fail
/register --> POST = user
/profile --> GET = user
/image --> PUT = user

*/