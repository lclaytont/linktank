var express = require('express');
var emailSvc = require('../services/email.svc');

var router = express.Router();

router.post('/', function(req, res) {
    emailSvc.sendEmail(req.body.to, req.body.from, req.body.subject, req.body.content)
        .then(function() {
            res.sendStatus(204);
        }, function(err) {
            console.log(err)
            res.sendStatus(err.message);
        })
})

module.exports = router;