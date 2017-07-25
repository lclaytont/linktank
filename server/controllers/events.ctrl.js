var express = require('express');
var eventsProc = require('../procedures/reviews.proc');

var router = express.Router();

router.route("/")  //when at the homepage, anyone can see all posts. Don't need to be signed in. 
    .get(function (req, res) {  
        eventsProc.read(req.params.id)
            .then(function (post) {
                res.send(post);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    })


// when at an orgs page
router.route('/:id')
    .get(function (req, res) {  //anyone can get(see) posts at this route. Don't need to be signed in. 
        eventsProc.read(req.params.id)
            .then(function (post) {
                res.send(post);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    })

    .post(auth.isLoggedIn, function (req, res) {  //only the logged in user can post a new event
        eventsProc.write(req.params.id, req.body.title, req.body.content)
            .then(function () {
                res.sendStatus(204);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    })

    .put(auth.isLoggedIn, function (req, res) {  //only the logged in user can update an event
        eventsProc.update(req.params.id, req.body.title, req.body.content)
            .then(function () {
                res.sendStatus(204);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    })

    .delete(auth.isLoggedIn, function (req, res) {  //has to be logged in to delete
        eventsProc.destroy(req.params.id)
            .then(function () {
                res.sendStatus(204);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    });

module.exports = router;