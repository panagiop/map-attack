var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

var path = require('path'); 

// var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var passport = require('passport');
var generalconfig = require('./generalconfig'); 

// mongoose.connect('mongodb://localhost/mapattack'); 
mongoose.connect(generalconfig.db);

// populate db with sample data
// require('./db/sample-data');

var clientpath = path.normalize(__dirname + '/../client');

// all environments
// app.set('port', process.env.PORT || 3000);
app.set('views', path.join(clientpath, 'views'));
//app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(compress());
app.use(logger('dev'));
app.use(methodOverride()); 
app.use(cookieParser()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer());

app.use(express.static(path.join(clientpath, 'public'), { maxAge: 2628000000 }));
//app.use(express.static(path.join(__dirname, 'public')));

// requirements (routes and other stuff)
require('./socketconfig')(io);
require('./routes')(app);  
require('./auth/local/config/passport');

app.use(passport.initialize());

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
    app.use(errorHandler());
} 

exports = module.exports = app;
