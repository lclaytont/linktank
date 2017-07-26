// NEED TO MAKE STORED PROCEDURES FOR DIS SHITS as of 7/25/17

var db = require('../config/db');

exports.all = function(){
    return db.rows('GetEvents');
}

exports.all = function(){
    return db.rows('GetOrgs')
}

exports.create = function(title, userid, categoryid, content){ //C
    return db.row('PostNewEvent', [title, userid, content]);
}
 
exports.read = function(id){  //R
    return db.row('GetSpecifiedEvents', [id]);
}


exports.update = function(id, title, content, categoryid){  //U
    return db.empty('UpdateEvent', [id, title, content]);
}

exports.destroy = function(id){  //D
    return db.empty('DeleteEvent', [id]);
}