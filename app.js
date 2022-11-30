var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

//Connecting to Mongo DB
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//Using Mongoose library
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL)
  .then((res) => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })

var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');

// ref to our new controllers
var bugs = require('./controllers/bugs')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// map any requests with /bugs in url to the bugs controller
app.use('/bugs', bugs)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
