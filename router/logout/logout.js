let express = require('express')
const router = express.Router()
let app = express()


app.get('/', function(req, res){
    console.log('logout router')
    req.logout()
    res.redirect('/login')
})

module.exports = router