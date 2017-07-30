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
exports.updateVol = function(id, name, email, about, city, state) {
    return db.empty('update_Volunteers', [id, name, email, about, city, state]);
} 

exports.updateVolImg = function(id, img) {
    return db.empty('Update_VolunteerImage', [id, img]);
}

exports.getVolImage = function(id) {
    return db.row('get_VolImg', [id]);
}