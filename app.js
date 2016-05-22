var express      = require('express');

var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon      = require('serve-favicon');
var morgan       = require('morgan');
var path         = require('path');

var routes = require('./routes/index');
var users  = require('./routes/users');

var app = express();

// VIEW ENGINE
// ==============================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// CONFIGURATION
// ==============================================
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use('/', routes);
app.use('/users', users);


// ERROR HANDLING
// ==============================================
app.use(function(req, res, next)
{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// DEVELOPMENT
if (app.get('env') === 'development')
{
  app.use(function(err, req, res, next)
  {
    res.status(err.status || 500);
    res.render('error',
    {
      message: err.message,
      error: err
    });
  });
}

// PRODUCTION
app.use(function(err, req, res, next)
{
  res.status(err.status || 500);
  res.render('error',
  {
    message: err.message,
    error: {}
  });
});

// SERVER
// ==============================================

app.listen(3000, function ()
{
  console.log('Server started on port 3000');
});
