var db = require('../config/sql.db'); 

// Volunteer Procedures: 

exports.readByEmail = function(email) {
    return db.row('Read_Email', [email]);
}

// GET ALL VOLUNTEERS
exports.all = function() {
    return db.rows('Get_Volunteers', []);
}

// GET SINGLE VOLUNTEER
exports.read = function(id) {
    return db.row('Get_singleVolunteer', [id]);
}

// INSERT VOLUNTEER
exports.write = function(email, name, password) {
    return db.empty('Insert_Volunteers', [email, name, password]);
}

// UPDATE VOLUNTEER
exports.updateVol = function(id, name, email, image, about) {
    return db.row('update_Volunteers', [id, name, email, password, image, about]);
}
