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
// exports.updateVol = function(id, name, email, image, about) {
//     return db.row('update_Volunteers', [id, name, email, password, image, about]);
// }


exports.updateOrgImg = function(id, img) {
    return db.empty('Update_OrganizationImage', [id, img]);
}

exports.updateOrg = function(id, organizationName, contact, address, email, city, state, zip, phone, about) {
    return db.empty('update_Organization', [id, organizationName, contact, address, email, city, state, zip, phone, about])
}