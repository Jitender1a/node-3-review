module.exports = function(req, res, next) {
    //This function will run on every request. If there is no session active for the client requesting an endpoint, we will create a user object on the session otherwise it will just call next and move on
    //it is crucial that we invoke next in every middleware function otherwise the request will just hang and never move on to the next function in the route
    if(!req.session.user) {
        req.session.user = {}
    }
    next()
}