var passport = require('passport');
var router = express.Router();

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { console.log(err); return res.sendStatus(500); }
        if (!user) { return res.status(401).send(info); }
        req.logIn(user, function (err) {
            if (err) { return res.sendStatus(500); }
            else { return res.send(user); }
        })
    })(req, res, next);

    router.get('/logout', function (req, res) {
        req.session.destroy(function () {
            req.logOut();
            res.sendStatus(204);
        });
    })