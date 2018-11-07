module.exports = function(req, res, next) {
    //this middleware is slightly different. it doesn't let the request proceed automatically. If the user is not currently logged in then it will send back a status of 403. If they are it will call next and move on to the next function in the route 
    if(req.session.user.loggedIn) {
        next()
    } else {
        res.status(403).send('Not allowed')
    }
}