var db = require('../config/sql.db');

//  --> Event Procedures: 

// CRUD 

exports.getAllEvents = function(){
    return db.rows('Get_Events', []);
};

exports.getSingleEvent = function(id) {
    return db.row('Get_singleEvent', [id]);
};

exports.createEvent = function(organizationId, title, description, helpNeeded, startTime, endTime, totalHours) {
    return db.row('Insert_Event', [organzationId, title, description, helpNeeded, startTime, endTime, totalHours])
};

exports.updateEvent = function(id, title, description, helpNeeded, startTime, endTime, totalHours) {
    return db.empty('Update_Events', [id, title, description, helpNeeded, startTime, endTime, totalHours])
}; 

exports.getEventsbyOrg = function(organzationId) {
    return db.rows('Get_organizationEvents', [organizationId]);
}
exports.deleteEvent = function(id) {
    return db.empty('Delete_Event', [id]);
};

exports.volunteerForEvent = function(volunteers_Id, id) {
    return db.empty('VolunteerForEvent', [volunteers_id, id])
}

exports.getSignedUpVols = function(eventId) {
    return db.rows('See_Vols_SignedUp', [eventId]);
}