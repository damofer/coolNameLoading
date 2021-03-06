// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.ID);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE ID = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
           
            usernameField : 'username',
            passwordField : 'password',           
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
             var email =req.body.email;
             var rol =req.body.rol;
           
            // we are checking to see if the user trying to login already exists

            connection.query("SELECT * FROM users WHERE USERNAME = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                
                if (rows.length) {
                    console.log("username taken");
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));

                    
                } else {

                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null),  // use the generateHash function in our user model
                        email:email
                        
                    };
                   
                    var insertQuery = "INSERT INTO users (USERNAME,EMAIL, PASSWORD) values (?,?,?)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.email, newUserMysql.password],function(err, rows) {
                        newUserMysql.ID = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
            
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
             
            connection.query("SELECT * FROM users WHERE USERNAME = ?",[username], function(err, rows){
                 
                if (err){
                      
                      return done(err);
                    }

                 
                if (!rows.length) {
                      
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                
                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].PASSWORD)){
                      
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                     // create the loginMessage and save it to session as flashdata
                }else{
                    
                    return done(null, rows[0]); 
                }
              

                // all is well, return successful user
               
            });
        })
    );
};
