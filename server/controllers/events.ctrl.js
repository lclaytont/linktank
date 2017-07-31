var express = require('express');
var eventProc = require('../procedures/events.proc'); 
var auth = require('../middleware/auth.mw');
var router = express.Router();

// --> /api/events/

// --> PROTECT ROUTES FOR VOLS AND ORGS
router.route('*').all(auth.isLoggedIn);

// SEE LIST OF EVENTS 
// USER & ORGS SEE THEIR UPCOMING EVENTS
// USER & ORGS SEE PAST EVENTS
// USER & ORGS CAN SEE THE DETAIL OF A SINGLE EVENT
router.get('/', function(req, res) {
    return eventProc.getAllEvents()
        .then(function(events) {
            console.log('Retrieved List of Events');
            res.send(events);
        }, function(err) {
            console.log('Could not retrieve Events: ' + err.message);
            res.sendStatus(500);
        })
});

//  --> ONE EVENT INDEPENDENT OF ORG --> GRABBING EVENT ID
router.get('/:id', function(req, res) {
    return eventProc.getSingleEvent(req.params.id)
        .then(function(event) {
            console.log('I retrieved event ' + req.params.id);
            res.send(event);
        }, function(err) {
            console.log('Could not retrieve single event');
            res.sendStatus(500);
        })
})


// USER CAN SEE THE EVENTS OF A SINGLE ORG
router.get('/organization/:id', function(req, res) {
    return eventProc.getEventsbyOrg(req.params.id)
        .then(function(events) {
            console.log('Retrieved all of this organization\'s events');
            res.status(201).send(data);
        }, function(err) {
            console.log('Could not grab this organization\'s events');
            res.sendStatus(504);
        })
})






//  --> PROTECTED ROUTES FOR ORGS

// CREATE NEW EVENT
router.post('/', auth.isOrg, function(req, res) {
    return eventProc.createEvent(req.body.organizationId, req.body.title, req.body.description, req.helpNeeded,
    req.body.startTime, req.body.endTime, req.body.totalHours)
        .then(function(data) {
            console.log('Successfully created an event');
            res.status(201).send(data);
        }, function(err) {
            console.log('Event could not be created ' + err.message);
            res.sendStatus(500);
        })
})

// UPDATE EVENT 
router.put('/:id', auth.isOrg, function(req, res) {
    return eventProc.updateEvent(req.params.id, req.body.title, req.body.description, req.body.helpNeeded,
    req.body.startTime, req.body.endTime, req.body.totalHours)
        .then(function() {
            console.log('Updated Event');
            res.sendStatus(201);
        }, function(err) {
            console.log('Event could not be updated: ' + err.message);
            res.sendStatus(500);
        })
});

// DELETE EVENT
router.delete('/:id', auth.isOrg, function(req, res) {
    return eventProc.deleteEvent(req.params.id)
        .then(function() {
            console.log('Deleted Event');
            res.sendStatus(201);
        }, function(err) {
            console.log('Could not delete event');
            res.sendStatus(504);
        })
})

// ORGS CAN SEE VOLS SIGNED UP FOR AN EVENT