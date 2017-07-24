
exports.isLoggedIn = function (req, res, next) {  //DOUBLE CHECK THIS SHIT
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// GOOGLEY SHIT
//this is supposeed to reirect you to google, authorize, then send you back to the site. 
app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile'] }));


// If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),  //if authorization fails, sends us to /login again. 
    function (req, res) {
        res.redirect('/');  //this is where you will be redirected to. Most likey the home page but we will see
    });


