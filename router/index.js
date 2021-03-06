let express = require('express')
let router = express.Router()
let path = require('path')
let main = require('./main/main')
let email = require('./email/email')
let join = require('./join/join')
let login = require('./login/login')
let logout = require('./logout/logout')



//url routing
router.get('/', function(req, res){
    console.log('indexjs / path loaded')
    res.sendFile(path.join((__dirname, "../public/main.html")))
})

router.use('/main', main)
router.use('/email', email)
router.use('/join', join)
router.use('/login', login)
router.use('/logout', logout)

module.exports = router