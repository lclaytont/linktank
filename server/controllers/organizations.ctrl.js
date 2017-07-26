var express = require('express');
var orgProc = require('../procedures/organizations.proc');
var auth = require('../middleware/auth.mw');

var router = express.Router();

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
router.route('/:id')
    .get(function (req, res) {  //anyone can get(see) posts at this route. Don't need to be signed in. 
        orgProc.read(req.params.id)
            .then(function (event) {
                res.send(event);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    })

    .post(auth.isLoggedIn, auth.isOrg, function (req, res) {  //only the logged in AS ORG can post a new event
        orgProc.create(req.params.id, req.body.title, req.body.content)
            .then(function () {
                res.sendStatus(204);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    })

    .put(auth.isLoggedIn, auth.isOrg, function (req, res) {  //only the logged in AS ORG can update an event
        orgProc.update(req.params.id, req.body.title, req.body.content)
            .then(function () {
                res.sendStatus(204);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    })

    .delete(auth.isLoggedIn, auth.isOrg, function (req, res) {  //has to be logged AS ORG in to delete
        orgProc.destroy(req.params.id)
            .then(function () {
                res.sendStatus(204);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    });

module.exports = router;