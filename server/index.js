var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var api = require("./api");
var routeMw = require("./middleware/route.mw");
var passport = require('./config/passport');
var cookieParser = require('cookie-parser'); 

var app = express();

app.use(express.static(path.join(__dirname, "../client")));
app.use(bodyParser.json());
app.use(cookieParser());

passport(app);

app.use('/api', api);

app.get("*", function(req, res, next) {
    if(routeMw.isAsset(req.url)) {
        next();
    } else {
        res.sendFile(path.join(__dirname, "../client/index.html"));
    }
})

app.listen(process.env.PORT || 3000);  // process.env.PORT for aws
