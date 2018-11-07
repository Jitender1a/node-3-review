const express = require('express')
const bodyParser = require('body-parser')
//This is the only package that we need to bring in to enable sessions
const session = require('express-session')
const uc = require('./controllers/userController')
//Notice what is being exported from each of the below files. I'm exporting a function instead of an object like you are used to. This allows us to pass the variable directly to app.use while keeping the index file clean
const loggedIn = require('./middleware/loggedIn')
const userSetup = require('./middleware/userSetup')
//Make sure to bring in process.env variables below where you require dotenv
require('dotenv').config()
let {SERVER_PORT, SECRET} = process.env

const app = express()
app.use(bodyParser.json())
//Session is still a middleware package. We have to pass it to app.use and invoke it passing it an object with different options. 
//resave forces the session to save back to the store even if there were no changes made. it defaults to true which is why we set it to false
//saveUninitialized defaults to true but get in the habit of passing it anyways. It forces an initial session that was not modified to be saved to the session store on the server.
//The secret is the most critical part of the session and why we must bring it in from a secret file. It's a security issue so you don't want this secret getting out
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SECRET
}))

//An example of app level middleware. I would like to make sure that every user that visits my site has a session with a user property set to an object so I put this piece of middleware in to ensure that happens. It will run before every route.
app.use(userSetup)

app.post('/api/users', uc.login)
//loggedIn is an example of route level middleware. This route is going to be sending back some secrets so I want to make sure that the user tryig to access this endpoint is logged in
app.get('/api/users', loggedIn, uc.getSecrets)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})