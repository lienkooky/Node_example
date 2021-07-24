let express = require('express')
let bodyParser = require('body-parser')
let app = express()

app.listen(3000, function(){
    console.log(`start! express server on port 3000`)
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', "ejs")

//url routing
app.get('/', function(req, res){
    console.log('test')
    res.sendFile(__dirname + "/public/main.html")
})


app.get('/main', function(req, res){
    res.sendFile(__dirname + "/public/main.html")
})

// ejs 사용
app.post('/email_post', function(req, res){
    //get : req.param('email')
    console.log(req.body.email)
    // res.send("<h1>Welcome ! " + req.body.email + "</h1>")
    res.render('email.ejs', {'email' : req.body.email})
})

app.post('/ajax_send_email', function(req, res){
    console.log(req.body.email)
    //Check validation about input value => select db
    let responseData = {'result' : 'ok', 'email': req.body.email}
    res.json(responseData)
})