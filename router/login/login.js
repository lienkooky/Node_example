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
    
    res.render('login.ejs', {'message' : msg})
})

passport.serializeUser(function(user, done){
  console.log('passport session save : ', user.id)
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    console.log('passport session get id : ', id)
    done(null, id)
})

passport.use('local-login', new LocalStrategy({
    usernameFiled: 'email',
    passwordFiled: 'password',
    passReqToCallback : true
}, function(req, email, password, done){
   
    let query = connection.query('select * from user where email=?', [email], function(err, rows){
        if(err) return done(err)

        if(rows.length){
            console.log('existed user')
            return done(null, {'email': email, 'id': rows[0].UID})
        }else{
                return done(null, false, {'message': 'Ur login info is not found'})
            }
        })
    }
    console.log('local-join callback called')
})

router.post('/', function(req, res, next){
    passport.authenticate('local-login', function(err, user, info){
        if(err) res.status(500).json(err)
        if(!user) return res.status(401).json(info.message)

        req.logIn(user, function(err){
            if(err) next(err)
            return res.json(user)
        })
    })(req, res, next)
})


module.exports = router;