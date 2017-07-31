var express = require('express');
var path = require('path');
var passport = require('passport');
var orgProc = require('../procedures/organizations.proc');
var auth = require('../middleware/auth.mw');
var utils = require('../utils');  //this is for the hashing/salting
var multer = require('multer');
//configure multer for orgs 
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../client/images/userImg'));
    }, 
    filename: function(req, file, cb) {
        if (!file.originalname.match(/\.(png)$/)) {
            var err = new Error();
            err.code = 'filetype'; 
            console.log('NOPE, YOUR FILE TYPE DID NOT MATCH'); 
            return  cb(err);
        } else {
            var pieces = file.originalname.split('.');
            var piecesLen = pieces.length;
            cb(null, 'org' + req.params.id + '.' + pieces[piecesLen - 1]);
        }
    }
});

var upload = multer({storage: storage}).single('profilePic');

var router = express.Router();

router.post('/login', function (req, res, next) {//its a post request because you are sending data to the database
    passport.authenticate('Organization', function (err, user, info) { //this is ONLY FOR LOCAL STRAT
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) { //login failure
            return res.status(401).send(info);
        }
        req.login(user, function (err) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            } else {
                return res.send(user);
            }
        });
    })(req, res, next);
});


router.post('/', function(req, res) {
    utils.encryptPassword(req.body.password).then(function(hash){
        console.log(req.body);
        orgProc.write(req.body.email, hash, req.body.name, req.body.contact, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.phone)
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

router.get('/logout', function (req, res) {//it could be a post request, but its a get request just so we could go to /api/users/logout to logout
    req.session.destroy(function () {
        req.logOut();
        res.sendStatus(204);
    });
});

router.get('/', function(req, res) {
        return orgProc.all()
        .then(function(users) {
            console.log("FETCHED ORGS");
            console.log(users)
            res.send(users);
        }, function(err) {
            console.log(err.message);
            res.sendStatus(500);
        })
    }) 

// router.post('/', function(req, res) {
//     utils.encryptPassword(req.body.password).then(function(hash){
//         procedures.write(req.body.firstname, req.body.lastname, req.body.email, hash)
//             .then(function (id) {
//                 res.send(id)
//             }, function (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             })
//     })
// })   


router.get('/me', function (req, res) { //get request to /api/users/me
    res.send(req.user); //we are guaranteed that we are going to be logged in, and we are sending a user object with the current logged in user back with its properties (id, email, firstname, lastname) // passport sets req.user
});

//  --> Updates the path of the image in DB 
router.put('/picture_path/:id', function(req, res) {
   return orgProc.updateOrgImg(req.params.id, req.body.image) 
        .then(function() {
       console.log('Updated the path to the image');
       res.sendStatus(201);
   }, function(err) {
       console.log('Path to image not updated: ' + err.message)
       res.status(500).send(err);
   })
})

//  --> HANDLES UPLOADED IMAGES AND PUTS THEM IN /client/images/userImg
router.post('/organization_picture/:id', function(req, res) {
       upload(req, res, function(err) {
           if (err) {
                if (err.code === 'filetype') {
                    console.log('BAD FILETYPE: ' + err.message)
                    res.json({success: false, message: 'File type is invalid. Please use .png'})
                } else {
                    console.log("SOMETHING ELSE BAD: " + err.message + req.file)
                    res.json({success: false, message: 'File was not able to be uploaded'})
                }
           } else {
               if (!req.file) {
                   console.log('NO FILE UPLOADED?')
                   res.json({success: false, message: 'No File was selected'});
               } else {
                   console.log('FILE UPLOADED SUCCESSFULLY')
                   res.json({success: true, message: 'File was uplaoded'});
               }
           }
       })
});

router.get('/:id', function(req, res) {
    orgProc.read(req.params.id)
    .then(function(user) {
        res.send(user).status(201);
        console.log("Grabbed the org")
    }, function() {
        console.log(err);
        res.status(500).send(err);
    })
})

router.put('/:id', function(req, res) {
    orgProc.updateOrg(req.params.id, req.body.organizationName, req.body.contact, req.body.address, req.body.email, req.body.city, req.body.state, req.body.zip, req.body.phone, req.body.about)
        .then(function() {
        console.log("Updated Org");
        res.sendStatus(201);
    }, function(err) {
        console.log('Could Not Update Org');
        res.status(500).send(err);
    })
    
})

//we are currently at /api/organizations and this is to show ALL ORGS and DESCRIPTIONS per org.
//When here, anyone can see all events. Don't need to be signed in.
router.route("/")
    .get(function (req, res) {
        orgProc.all(req.params.id)  //what I need here is to get all orgs and descriptions
            .then(function (data) {
                res.send(data);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    })

    .post(function(req, res) {
        orgProc.create( req.body.id, req.body.description)  //here I need to post all orgs and descriptions
         .then(function(data) {
             res.status(201).send(data);
         }, function(err) {
             console.log(err);
             res.status(500).send(err);
         })
    })


// Here we have clicked on an Org, and we are now seeing their page. 
// Depending on the role they are signed in as, they can create and stuff. 
// router.route('/:id')
//     .get(function (req, res) {  //anyone can get(see) posts at this route. Don't need to be signed in. 
//         orgProc.read(req.params.id)
//             .then(function (event) {
//                 res.send(event);
//             }, function (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             });
//     })

//     .post(auth.isLoggedIn, auth.isOrg, function (req, res) {  //only the logged in AS ORG can post a new event
//         orgProc.create(req.params.id, req.body.title, req.body.content)
//             .then(function () {
//                 res.sendStatus(204);
//             }, function (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             });
//     })

//     .put(auth.isLoggedIn, auth.isOrg, function (req, res) {  //only the logged in AS ORG can update an event
//         orgProc.update(req.params.id, req.body.title, req.body.content)
//             .then(function () {
//                 res.sendStatus(204);
//             }, function (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             });
//     })

//     .delete(auth.isLoggedIn, auth.isOrg, function (req, res) {  //has to be logged AS ORG in to delete
//         orgProc.destroy(req.params.id)
//             .then(function () {
//                 res.sendStatus(204);
//             }, function (err) {
//                 console.log(err);
//                 res.status(500).send(err);
//             });
//     });

module.exports = router;