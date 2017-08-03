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

// GET ALL UPCOMING EVENTS
router.get('/upcoming', function(req, res) {
    return eventProc.getAllUpcoming()
        .then(function(events) {
            console.log('Got All Upcoming Events');
            res.send(events);
        }, function(err) {
            console.log('Could not retrieve upcoming events');
            res.sendStatus(504);
        })
}) 

// GET ALLUPCOMING EVENTS FOR ONE ORG
//  --> :id = Organization_Id
router.get('/upcoming/:id', function(req, res) {
    return eventProc.getOrgUpcoming(req.params.id)
        .then(function(events) {
            console.log('Retrieved upcoming events for Org' + req.params.id);
            res.send(events);
        }, function(err) {
            console.log('Could Not retrieve organization\'s upcoming events');
            res.sendStatus(504);
        })
})

// GET ALL PAST EVENTS
router.get('/past', function(req, res) {
    return eventProc.getAllPast()
        .then(function(events) {
            console.log('Retrieved all Past Evens');
            res.send(events);
        }, function(err) {
            console.log('Could not retrieve Past Events.');
            res.sendStatus(504);
        })
})

router.get('/past/:id', function(req, res) {
    return eventProc.getOrgPast(req.params.id)
        .then(function(events) {
            console.log('Got past events for Org' + req.params.id);
            res.send(events);
        }, function(err) {
            console.log('Could not retrieve past events for Org');
            res.sendStatus(504);
        })
})
//  --> ONE EVENT INDEPENDENT OF ORG --> GRABBING EVENT ID
//  --> :id = Event_Id
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

// SEE VOLUNTEERS FOR EVENT --> MAYBE NEED TO MOVE TO ORGS W/ auth.isOrg
// :id = Event_Id
router.get('/event_vols/:id', function(req, res) {
    return eventProc.getSignedUpVols(req.params.id)
        .then(function(volunteer) {
            console.log('Got list of volunteers for event' + req.params.id);
            res.send(volunteers);
        }, function(err) {
            console.log('Did not retrieve volunteers for this event: ' + err.message);
            res.sendStatus(504);
        })
})

//  --> SEE EVENTS A VOL SIGNED UP FOR 
//  --> NOT SURE IF req.params.id is appropraite or if I should grab volId in another way;
//  --> :id = Volunteers_id
router.get('/vols_events/:id', function(req, res) {
    var volId = req.params.id
    return eventProc.getVolsEvents(req.params.id)
        .then(function(events) {
            console.log('Retrieved events for volunteer ' + req.params.id);
            res.send(events)
        }, function(err) {
            console.log('Could not retrieve volunteer\'s events');
            res.sendStatus(504);
        })
})

// SEE UPCOMING EVENTS FOR A VOL
// :id = Volunteers_id
router.get('/vols_events/upcoming/:id', function(req, res) {
    console.log('GOT TO LINE 117')
    var volId = req.params.id;
    return eventProc.getVolsUpcomingEvents(volId)
        .then(function(events) {
            console.log('Retrieve upcoming events for Vol' + volId);
            res.send(events);
        }, function(err) {
            console.log('Unable to retrieve vol' + volId + '\'s upcoming events');
            res.sendStatus(504);
        })
})

// SEE PAST EVENTS FOR A VOL
// :id = Volunteers_id
router.get('/vols_events/past/:id', function(req, res) {
    var volId = req.params.id;
    return eventProc.getVolsPastEvents(volId)
        .then(function(events) {
            console.log('Retrieved past events for Vol' + volId);
            res.send(events);
        }, function(err) {
            console.log('Could not retrieve past events for vol' + volId);
            res.sendStatus(504);
        })
})

// USER CAN SEE THE EVENTS OF A SINGLE ORG
// :id = Organization_id
router.get('/organization/:id', function(req, res) {
    console.log(req.params.id)
    return eventProc.getEventsbyOrg(req.params.id)
        .then(function(events) {
            console.log('Retrieved all of this organization\'s events');
            res.status(201).send(events);
        }, function(err) {
            console.log('Could not grab this organization\'s events');
            res.sendStatus(504);
        })
})

// VOL/ORG CAN SEE NUMBER OF VOLS ALREADY SIGNED UP
// :id = Events_id
router.get('/vol_count/:id', function(req, res) {
    return eventsProc.getCountOfVols(req.params.id)
        .then(function(count) {
            console.log('Retrieved volunteer count for event');
            res.send(count);
        }, function(err) {
            console.log('Unable to retrieve count: ' + err.message);
            res.sendStatus(504);
        })
})




//  --> PROTECTED ONLY FOR VOLS
//  --> VOLUNTEER CAN SIGN UP TO VOLUNTEER FOR EVENT 
//  --> :id = Events_id 
//  --> Must pass along Volunteer_id either as req.user.id or grab from front end some other way
router.post('/volunteer_for_event/:id', auth.isVol, function(req, res) {
    return eventProc.volunteerForEvent(req.user.id, req.params.id)
        .then(function() {
            console.log('User volunteered for new event');
            res.send(201);
        }, function(err) {
            console.log('User unable to volunteer for new event');
            res.sendStatus(504);
        })
})






//  --> PROTECTED ROUTES FOR ORGS

// CREATE NEW EVENT
router.post('/', auth.isOrg, function(req, res) {
    return eventProc.createEvent(req.body.organizationId, req.body.title, req.body.description, req.helpNeeded,
    req.body.date, req.body.startTime, req.body.endTime, req.body.totalHours)
        .then(function(data) {
            console.log('Successfully created an event');
            res.status(201).send(data);
        }, function(err) {
            console.log('Event could not be created ' + err.message);
            res.sendStatus(500);
        })
})

// UPDATE EVENT 
// :id = Events_Id  
router.put('/:id', auth.isOrg, function(req, res) {
    console.log(req.params.id, req.body.title, req.body.description, req.body.helpNeeded,
    req.body.date, req.body.startTime, req.body.endTime, req.body.totalHours)
    return eventProc.updateEvent(req.params.id, req.body.title, req.body.description, req.body.helpNeeded,
    req.body.date, req.body.startTime, req.body.endTime, req.body.totalHours)
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

module.exports = router;