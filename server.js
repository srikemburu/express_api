// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const db = mongoose.connection

// Environment Variables (getting ready for Heroku)
const app = express();
const mongoURI = process.env.MONGODB_URI 
const PORT = process.env.PORT || 3001

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true },
    () => console.log('MongoDB connection established:', mongoURI)
  )

  // Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware

//express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());
// extended: false - does not allow nested objects in query strings

app.use(express.urlencoded({ extended: false }))

//Express provides you with middleware to deal with the (incoming) data (object) in the body of the request.

//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());

app.use(express.json()); //use .json(), not .urlencoded()

// we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!

app.use(express.static('public'))

app.use(cors())

// Routes
const todosController = require('./controllers/todos.js');
app.use('/todos', todosController);

app.listen(PORT, () => {
  console.log('Let\'s get things done on port', PORT)
})