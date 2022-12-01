var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// auth packages
const passport = require('passport')
const session = require('express-session')


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
var priorities = require('./controllers/priorities')
var statuses = require('./controllers/statuses')
var auth = require('./controllers/auth')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  save: false
}))

app.use(passport.initialize())
app.use(passport.session())

// tell passport which model is handling the users. It uses the local strategy by default
const User = require('./models/user')
passport.use(User.createStrategy())





// read/write users to/from session object using passport-local-mongoose
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


var googleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },

  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ oauthId: profile.id }, {
      username: profile.displayName,
      oauthProvider: 'Google',
      created: Date.now()
    }, (err,user)=>{
      return done(err,user);
    });
  }
));


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
app.use('/priorities', priorities)
app.use('/statuses', statuses)
app.use('/auth', auth)

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
