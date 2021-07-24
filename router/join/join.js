let express = require('express')
let router = express()
let router = express.Router()
let path = require('path')
let mysql = require('mysql')


// DATABASE SETTING
let connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user: `root`,
    password: 'asdf1234',
    database : 'NODE_db'
})

connection.connect()


router.get('/', function(req, res){
    console.log('get join url')
    res.render('join.ejs')
})

router.post('/', function(req, res){
    let body = req.body
    let email = body.email
    let name = body.name
    let password = body.password
    console.log(email)

    let sql = {email: email, name: name, pw: password}
    let query = connection.query(`insert into user set ?`, sql, function(err, rows){
        if(err) throw err
        console.log('ok db insert : ', rows.insertId, name)
        res.render('welcome.ejs', {'name' : name, 'id' : rows.insertId})
    })
})

module.exports = router;