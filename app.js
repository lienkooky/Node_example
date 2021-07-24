let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let index = require('./router/index')
let passport = require('passport')
let localStrategy = require('passport-local').Strategy
let session = require('express-session')
let flash = require('connect-flash')

app.listen(3000, function(){
    console.log(`start! express server on port 3000`)
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', "ejs")

app.user(session({
    secret: 'Keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(index)