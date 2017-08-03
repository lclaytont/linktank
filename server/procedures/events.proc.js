var db = require('../config/sql.db');

//  --> Event Procedures: 

// CRUD 

exports.getAllEvents = function(){
    return db.rows('Get_Events', []);
};

exports.getAllUpcoming = function() {
    return db.rows('GetUpcomingEvents', []);
}

exports.getAllPast = function() {
    return db.rows('GetPastEvents', []);
}

exports.getOrgUpcoming = function(organizationId) {
    return db.rows('GetAllUpcoming_Org', [organizationId]);
}

exports.getOrgPast = function(organizationId) {
    return db.rows('GetAllPast_Org', [organizationId]);
}

exports.getSingleEvent = function(id) {
    return db.row('Get_singleEvent', [id]);
};

exports.createEvent = function(organizationId, title, description, helpNeeded, date, startTime, endTime, totalHours, address, city, state) {
    return db.row('Insert_Event', [organizationId, title, description, helpNeeded, date, startTime, endTime, totalHours, address, city, state])
};

exports.updateEvent = function(id, title, description, helpNeeded, date, startTime, endTime, totalHours, address, city, state) {
    return db.empty('Update_Events', [id, title, description, helpNeeded, date, startTime, endTime, totalHours, address, city, state])
}; 

exports.getEventsbyOrg = function(orgId) {
    return db.rows('Get_organizationEvents', [orgId]);
}
exports.deleteEvent = function(id) {
    return db.empty('Delete_Event', [id]);
};

exports.volunteerForEvent = function(volunteers_id, id) {
    return db.empty('VolunteerForEvent', [volunteers_id, id])
}

exports.getSignedUpVols = function(eventId) {
    return db.rows('See_Vols_SignedUp', [eventId]);
}

exports.getVolsEvents = function(volId) {
    return db.rows('See_Events_SignedUp', [volId]);
}

exports.getVolsUpcomingEvents = function(volId) {
    return db.rows('SeeUpcomingEventsSignedUpFor', [volId]);
}

exports.getVolsPastEvents = function(volId) {
    return db.rows('SeePastEventsSignedUpFor', [volId]);
}

exports.getCountOfVols = function(eventId) {
    return db.row('See_CountOfVols', [eventId]);
}