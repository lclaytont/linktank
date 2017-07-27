var express = require("express");

var orgCtrl = require("./controllers/organizations.ctrl");
var volCtrl = require("./controllers/volunteers.ctrl");

var router = express.Router();

router.use('/organizations', orgCtrl);
router.use('/volunteers', volCtrl);

module.exports = router;