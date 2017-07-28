var express = require('express');
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var LocalStrategy = require('passport-local').Strategy;  //enables passport to authenticate un and pw
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;  //for google strat
var userProc = require('../procedures/volunteers.proc');
var orgProc = require('../procedures/organizations.proc');
var pool = require('./sql.db').pool;
var utils = require('../utils');


function configurePassport(app) {

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


    passport.use('Volunteer', new LocalStrategy({  //LOCAL STRAT SIGN IN
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        userProc.readByEmail(email)
            .then(function (user) {
                console.log('got user for authenticate');
                console.log(user);
                if (!user) {
                    return done(null, false, { message: 'Incorrect Login!' });
                }
                console.log('checking password');
                utils.checkPassword(password, user.password) //checks hashed pw vs what it should be
                    .then(function (passwordMatches) {
                        console.log(password);
                        console.log('password checked!');
                        console.log(passwordMatches);
                        if (passwordMatches) {
                        
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Incorrect Login!' });
                        }
                    }, function(err) {
                        return done(err);
                    });
            //     if (password === user.password) {
            //         return done(null, user);
            //     } else {
            //         return done(null, false, { message: 'Incorrect Login!' });
            //     }
            // }, function (err) {
            //     return done(err);
            // });
    })
    }));


    // //////////////////////////////////////

    passport.use('Organization', new LocalStrategy({  //LOCAL STRAT SIGN IN
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        orgProc.readByEmail(email)
            .then(function (user) {
                console.log('got user for authenticate');
                console.log(user);
                if (!user) {
                    return done(null, false, { message: 'Incorrect Login!' });
                }
                console.log('checking password');
                utils.checkPassword(password, user.password) //checks hashed pw vs what it should be
                    .then(function (passwordMatches) {
                        console.log('password checked!');
                        console.log(passwordMatches);
                        if (passwordMatches) {
                            // delete user.password;
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Incorrect Login!' });
                        }
                    }, function(err) {
                        return done(err);
                    });
            
    })
    }));

   
    passport.serializeUser(function (user, done) { //serialize users shit (takes user id, email, names, etc and spit out a way to uniquely identify the user)
        console.log(user);
        done(null, {id: user.id, role: user.role});
    });

    passport.deserializeUser(function (key, done) {  //deserialize user (take a unique identifier of a user and spit out the full user (e.g. get the user from the database))
        console.log("Deserialize that shit");
        // if (user) {
            if (key.role === 'Volunteer') {
                userProc.read(key.id).then(function (user) {  //references the procedure function that eventually calls getUsers()
                    done(null, user);  //this happens after you have already logged in. this is what sets req.user
                }, function (err) {
                    done(err);
                });
            } else if (key.role === 'Organization') {
                orgProc.read(key.id).then(function(user) {
                    done(null, user);
                }, function(err) {
                    done(err);
                })
            }
        // }
    });

}

module.exports = configurePassport;

        // passport.use(new CreateStrategy(  //Create new users stratagy. Not sure if we have to require passport-create??
    //     function (done) {
    //         User.create({
    //             usernameField: 'email',
    //             passwordField: "password"
    //         }, function (err, user) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             if (!user) {
    //                 return done(null, false);
    //             }
    //             return done(null, user);
    //         });
    //     }
    // ));

    // passport.use(new GoogleStrategy({  //GOOGLE STRAT SIGN IN
    //     clientID: configAuth.googleAuth.clientID,
    //     clientSecret: configAuth.googleAuth.clientSecret,
    //     callbackURL: "http://www.example.com/auth/google/callback",

    // },
    //     function (token, refreshToken, profile, done) {

    //         // make the code asynchronous
    //         // User.findOne won't fire until we have all our data back from Google
    //         process.nextTick(function () {

    //             // try to find the user based on their google email
    //             User.findOne({ 'google.email': profile.email }, function (err, user) {
    //                 if (err)
    //                     return done(err);

    //                 if (user) {// if a user is found, log them in
    //                     return done(null, user);

    //                 } else { // if the user isnt in our database, create a new user
    //                     var newUser = new User();

    //                     // set all of the relevant information
    //                     newUser.google.id = profile.id;
    //                     newUser.google.token = token;
    //                     newUser.google.name = profile.displayName;
    //                     newUser.google.email = profile.emails[0].value; // pull the first email

    //                     // save the user
    //                     newUser.save(function (err) {
    //                         if (err)
    //                             throw err;
    //                         return done(null, newUser);
    //                     });
    //                 }
    //             });
    //         });
    //     }));

    //     userProc.read(id).then(function (user) {  //references the procedure function that eventually calls getUsers()
    //         done(null, user);  //this happens after you have already logged in. this is what sets req.user
    //     }, function (err) {
    //         done(err);
    //     });
    // });

    // var sessionStore = new MySQLStore({ //basically we are ensuring that the sessions are maintained by express in a table in the db and not in memory (ram)
    //     createDatabaseTable: true
    // }, pool);

    // app.use(session({  //starting the express session. session is the variable declared at the top of the page.
    //     secret: 'randomly-generated string!',
    //     store: sessionStore,
    //     resave: false,
    //     saveUninitialized: false  //only create sessions and save them to db from users that are logged in
    // }));

    // app.use(passport.initialize());//starts up passport
    // app.use(passport.session());//telling passport that express is going to be cooperating with the session

//     }
// ))}



