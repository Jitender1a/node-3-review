const secrets = ['hello', 'test']
module.exports = {
    getSecrets(req, res) {
        res.status(200).send(secrets)
    },
    login(req, res) {
        req.session.user.loggedIn = true 
        res.sendStatus(200)
    }
}