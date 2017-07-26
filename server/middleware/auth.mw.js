
exports.isLoggedIn = function(req, res, next){
    if(req.user){
        next();
    }else{
        res.sendStatus(401);
    }
}

exports.isOrg = function(req, res, next){
    if(req.Organization){
        next();
    }else{
        res.sendStatus(401);
    }
}

exports.isVol = function(req, res, next){
    if(req.Volunteers){
        next();
    }else{
        res.sendStatus(401);
    }
}