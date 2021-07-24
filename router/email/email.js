let express = require('express')
let router = express()
let mysql = require('mysql')
let router = express.Router()

// DATABASE SETTING
let connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user: `root`,
    password: 'asdf1234',
    database : 'NODE_db'
})

connection.connect()

// ejs 사용 ROUTER
router.post('/form', function(req, res){
    //get : req.param('email')
    console.log(req.body.email)
    // res.send("<h1>Welcome ! " + req.body.email + "</h1>")
    res.render('email.ejs', {'email' : req.body.email})
})

router.post('/ajax', function(req, res){
    console.log(req.body.email)
    //Check validation about input value => select db
    // let responseData = {'result' : 'ok', 'email': req.body.email}
    let email = req.body.email
    let responseData = {}

    let query = connection.query('select name from user where email="' + email + '"', function(err, rows){
        if(err) throw err;
        if(rows[0]){
            console.log(rows[0])
            responseData.result = 'ok'
            responseData.name = rows[0].name
        }else{
            console.log(`none : ` + rows[0])
            responseData.result = 'none'
            responseData.name = ''
        }
        res.json(responseData)
    })
})

module.exports = router;