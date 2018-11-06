module.exports = function(req, res, next) {
    if(req.session.user.loggedIn) {
        next()
    } else {
        res.status(403).send('Not allowed')
    }
}