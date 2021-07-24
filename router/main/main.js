let express = require('express')
let app = express()
let router = express.Router()
let path = require('path')


router.get('/', function(req, res){
    let id = req.user
    if(!id) res.render('login.ejs')
    res.render('main.ejs', {'id' : id})
})

module.exports = router;