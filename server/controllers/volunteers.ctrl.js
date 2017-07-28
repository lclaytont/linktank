//all of this should be good
var express = require('express');
var passport = require('passport');
var procedures = require('../procedures/volunteers.proc');
var auth = require('../middleware/auth.mw');
var utils = require('../utils');  //this is for the hashing/salting

// k

var router = express.Router();

//you only get to this point once you are past /api/users

//this is actually /api/user/login
router.post('/login', function (req, res, next) {//its a post request because you are sending data to the database
    console.log("loggging int");
    passport.authenticate('Volunteer', function (err, user, info) { //this is ONLY FOR LOCAL STRAT
        // console.log("the signed in user it" + )
        if (err) {
            console.log(err);
            return res.sendStatus(500);
            console.log("HEEEEEEELP")
        }
        if (!user) { //login failure
            return res.status(401).send(info);
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            } else {
                return res.send(user);
            }
        });
    })(req, res, next);
});

//for writing (creating) a new volunteer!
router.post('/', function(req, res) {
    var u = req.body;
    utils.encryptPassword(u.password).then(function(hash){
        procedures.write(u.email, u.name, hash)
            .then(function (id) {
                res.send(id)
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
            })
    })
})   


router.route('*')//everything after this point, we are ensuring the user is logged in.
    .all(auth.isLoggedIn);
// utils.encryptPassword(u.password).then(function(hash){
//         procedures.write(u.email, u.name, hash)
//             .then(function (id) {
//                 res.send(id)
//             }, function (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             })
//     })
// }) 

// router.route('*')//everything after this point, we are ensuring the user is logged in.
//     .all(auth.isLoggedIn);

router.get('/logout', function (req, res) {//it could be a post request, but its a get request just so we could go to /api/volunteers/logout to logout
    console.log("Logging out");
    req.session.destroy(function () {
        console.log(1);
        req.logOut();
        console.log(2);
        res.sendStatus(204);
    });
});

router.get('/me', function (req, res) { //get request to /api/users/me
    console.log("ITsame");
    console.log(req.user);
    res.send(req.user); //we are guaranteed that we are going to be logged in, and we are sending a user object with the current logged in user back with its properties (id, email, firstname, lastname) // passport sets req.user
});


router.get('/', function(req, res) {
    console.log("Yerpaderp");
        return procedures.all()
        .then(function(users) {
            console.log("FETCHED VOLUNTEERS");
            console.log(users)
            res.send(users);
        }, function(err) {
            console.log(err.message);
            res.sendStatus(500);
        })
    }) 

// //for writing (creating) a new volunteer!
// router.post('/', function(req, res) {
//     var u = u;
//     utils.encryptPassword(u.password).then(function(hash){
//         procedures.write(u.firstname, u.lastname, u.email, hash)
//             .then(function (id) {
//                 res.send(id)
//             }, function (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             })
//     })
// })   

router.get('/:id', function(req, res) {
    procedures.read(req.params.id)
    .then(function(user) {
        res.send(user).status(201);
        console.log("Grabbed the user")
    }, function() {
        console.log(err);
        res.status(500).send(err);
    })
})

router.put('/:id', function(req, res) {
    var u = Organizations;
    procedures.updateEmail(req.params.id, Organizations.name, u.email, u.image, u.about).then(function() {
        if(u.password) {
            utils.encryptPassword(u.password).then(function(hash) {
                procedures.updatePw(req.params.id, hash).then(function() {
                    res.sendStatus(204)
                })               
            })
        } else {
            res.sendStatus(204);
        }
    })
    
})

// router.route('*')//everything after this point, we are ensuring the user is logged in.
    // .all(auth.isLoggedIn);

module.exports = router;