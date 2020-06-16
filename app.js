const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

//Importing Routers
const wikiRouter = require('./routes/wiki')
const usersRouter = require('./routes/users')

const app = express();

app.use(morgan("dev")); //logging middleware
app.use(express.static(path.join(__dirname, "./public")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const layout = require('./views/layout')

app.get('/', (req, res, next) => {
  res.redirect('/wiki')
})

app.use('/wiki', wikiRouter)
app.use('/users', usersRouter)



module.exports = app;
