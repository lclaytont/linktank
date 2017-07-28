// NEED TO MAKE STORED PROCEDURES FOR DIS SHITS as of 7/25/17

var db = require('../config/sql.db');

exports.readByEmail = function(email) {
    return db.row('Read_Email', [email]);
}

// GET ALL VOLUNTEERS
exports.all = function() {
    return db.rows('Get_Organization', []);
}

// GET SINGLE VOLUNTEER
exports.read = function(id) {
    return db.row('Get_singleOrganization', [id]);
}

// INSERT VOLUNTEER
exports.write = function(email, password, organizationName, contact, address, city, state, zip, phone) {
    return db.empty('Insert_Organization', [email, password, organizationName, contact, address, city, state, zip, phone]);
}

// UPDATE VOLUNTEER
exports.updateVol = function(id, name, email, image, about) {
    return db.row('update_Volunteers', [id, name, email, password, image, about]);
}

// exports.all = function(){
//     return db.rows('GetEvents');
// }

// exports.all = function(){
//     return db.rows('GetOrgs')
// }

// exports.create = function(title, userid, categoryid, content){ //C
//     return db.row('PostNewEvent', [title, userid, content]);
// }
 
// exports.read = function(id){  //R
//     return db.row('GetSpecifiedEvents', [id]);
// }


// exports.update = function(id, title, content, categoryid){  //U
//     return db.empty('UpdateEvent', [id, title, content]);
// }

// exports.destroy = function(id){  //D
//     return db.empty('DeleteEvent', [id]);
// }