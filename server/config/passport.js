var express = require('express');
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var LocalStrategy = require('passport-local').Strategy;  //enables passport to authenticate un and pw
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;  //for google strat
var userProc = require('../procedures/users.proc');
var pool = require('./db').pool;

function configurePassport(app) {

    passport.use(new LocalStrategy({  //this is our local strat sign in. 
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        userProc.readByEmail(email).then(function (user) {
            if (!user) {
                return done(null, false);
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Nope!' });
            }
            return done(null, user);
        }, function (err) { return done(err); });
    }));

    passport.use(new GoogleStrategy({  //google strat
        clientID: GOOGLE_CLIENT_ID,  //in .variables 
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"  //this should match the middleware, but it is where we send on sign in auth
    },
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ));

    passport.serializeUser(function (user, done) { //serialize users shit (takes user id, email, names, etc and spit out a way to uniquely identify the user)
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {  //deserialize user (take a unique identifier of a user and spit out the full user (e.g. get the user from the database))
        userProc.read(id).then(function (user) {  //references the procedure function that eventually calls getUsers()
            done(null, user);  //this happens after you have already logged in. this is what sets req.user
        }, function (err) {
            done(err);
        });
    });

    var sessionStore = new MySQLStore({ //basically we are ensuring that the sessions are maintained by express in a table in the db and not in memory (ram)
        createDatabaseTable: true
    }, pool);

    app.use(session({  //starting the express session. session is the variable declared at the top of the page.
        secret: 'randomly-generated string!',
        store: sessionStore,
        resave: false,
        saveUninitialized: false  //only create sessions and save them to db from users that are logged in
    }));

    app.use(passport.initialize());//starts up passport
    app.use(passport.session());//telling passport that express is going to be cooperating with the session

}

module.exports = configurePassport;
