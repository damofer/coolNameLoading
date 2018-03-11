// set up ======================================================================
// get all the tools we need
var express = require('express'),
    mysql = require('mysql'),
    path = require('path'),
	bodyParser = require('body-parser'),
	session  = require('express-session'),
	cookieParser = require('cookie-parser'),
	morgan = require('morgan'),
	passport = require('passport'),
	flash    = require('connect-flash')

var app = express();

// configuration ===============================================================

require('./config/passport')(passport);// pass passport for configuration

// connect to our database
var dbconfig = require('./config/database.js');
dbconfig.connection.database = dbconfig.database;
var connection = mysql.createPool(dbconfig.connection);




// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use( bodyParser.json() );  // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({// to support URL-encoded bodies
	extended: true
}));


app.use(express.static(path.join(__dirname, 'public')));//set public folder


// required for passport
app.use(session({
	secret: '@ccedo',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// vendor scripts
app.get('/vendor/angular.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'angular', 'angular.js'));
});
app.get('/vendor/angular-route.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'node_modules', 'angular-route', 'angular-route.js'));
});

// routes ======================================================================


require('./app/auth_routes.js')(app, passport); // load our auth_routes and pass in our app and fully configured passport

require('./app/service_routes.js')(app, connection); // get The ticket DB queries

app.listen(3000);
console.log('Server running at Port : ' + 3000);