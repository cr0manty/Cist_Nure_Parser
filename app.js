const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/cist_parser', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
   if (err)
       throw err;
   console.log('Successfully connected to mongodb');
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', console.error.bind(console, 'Connected:'));

app.use(session({
    secret: 'MySecretCodeIs_Pomelou',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.use('/', indexRouter);
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
