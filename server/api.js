var express = require("express");

var orgCtrl = require("./controllers/organizations.ctrl");
var volCtrl = require("./controllers/volunteers.ctrl");
var email = require('./controllers/email.ctrl');
var events = require('./controllers/events.ctrl');

var router = express.Router();

router.use('/organizations', orgCtrl);
router.use('/volunteers', volCtrl);
router.use('/email', email);
router.use('/events', events);

module.exports = router;