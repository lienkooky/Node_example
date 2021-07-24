let express = require('express')
let app = express()
let router = express.Router()
let path = require('path')


router.get('/', function(req, res){
    console.log('main js loaded')
    // res.sendFile(path.json(__dirname, "../public/main.html"))
    res.render('main.ejs', {'id' : id})
})

module.exports = router;