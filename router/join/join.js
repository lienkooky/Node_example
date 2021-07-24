let express = require('express')
let router = express()
let router = express.Router()
let path = require('path')
let mysql = require('mysql')
const passport = require('passport')
let LocalStrategy = require('passport-local').Strategy


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
    let msg;
    let errMsg = req.flash('error')
    if(errMsg) msg = errMsg
    console.log('get join url')
    res.render('join.ejs', {'message' : msg})
})

passport.serializeUser(function(user, done){
  console.log('passport session save : ', user.id)
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    console.log('passport session get id : ', id)
    done(null, id)
})

passport.use('local-join', new LocalStrategy({
    usernameFiled: 'email',
    passwordFiled: 'password',
    passReqToCallback : true
}, function(req, email, password, done){
    let query = connection.query('select * from user where email=?', [email], function(err, rows){
        if(err) return done(err)

        if(rows.length){
            console.log('existed user')
            return done(null, false, {message: 'your email is already used'})
        }else{
            let sql = {email: email, pw:password }
            let query = connection.query('insert into user set ?', sql, function(err, rows){
                if(err) throw err
                return done(null, {'email': email, 'id': rows.insertId})
            })
        }
    })
    console.log('local-join callback called')
}))

router.post('/', password.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true
}))





// router.post('/', function(req, res){
//     let body = req.body
//     let email = body.email
//     let name = body.name
//     let password = body.password
//     console.log(email)

//     let sql = {email: email, name: name, pw: password}
//     let query = connection.query(`insert into user set ?`, sql, function(err, rows){
//         if(err) throw err
//         console.log('ok db insert : ', rows.insertId, name)
//         res.render('welcome.ejs', {'name' : name, 'id' : rows.insertId})
//     })
// })

module.exports = router;