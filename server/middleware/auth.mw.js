
exports.isLoggedIn = function(req, res, next){
    if(req.user){
        next();
    }else{
        res.sendStatus(401);
    }
}

exports.isOrg = function(req, res, next){
    if(req.user.role === 'Organization'){
        next();
    }else{
        res.sendStatus(401);
    }
}

exports.isVol = function(req, res, next){
    if(req.user.role === 'Volunteer'){
        next();
    }else{
        res.sendStatus(401);
    }
}