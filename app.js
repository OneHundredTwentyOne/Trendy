var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var myProducts = require('./routes/myProducts');
var accountDetails = require('./routes/accountDetails');
var browse = require('./routes/browse');
var login = require('./routes/login');
var register = require('./routes/register');
var sell = require('./routes/sell');
var profile = require('./routes/profile');
var cart = require('./routes/cart');
var item = require('./routes/item');
var multer = require('multer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({dest:'./public/images/'}).single('file'));
app.use('/', routes);
app.use('/browse', browse);
app.use('/users', users);
app.use('/login', login);
app.use('/register', register);
app.use('/sell', sell);
app.use('/profile', profile);
app.use('/accountDetails', accountDetails);
app.use('/myProducts', myProducts);
app.use('/item', item);
app.use('/cart',cart);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
