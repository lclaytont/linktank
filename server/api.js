var express = require("express");

var orgCtrl = require("./controllers/organization.ctrl");

var router = express.Router();

router.use('/organization', orgCtrl);

module.exports = router;