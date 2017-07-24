var express = require('express'); 
var bodyParser = require('body-parser'); 
var path = require('path');

var app = express(); 

app.use(express.static(path.join( __dirname, '../client' )));
app.use(bodyParser.json());

app.listen(3000);
console.log('Listening on Port 3000');