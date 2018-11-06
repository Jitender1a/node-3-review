const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const uc = require('./controllers/userController')
const loggedIn = require('./middleware/loggedIn')
const userSetup = require('./middleware/userSetup')
require('dotenv').config()
let {SERVER_PORT, SECRET} = process.env

const app = express()
app.use(bodyParser.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SECRET
}))

app.use(userSetup)

app.post('/api/users', uc.login)
app.get('/api/users', loggedIn, uc.getSecrets)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})