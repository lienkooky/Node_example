let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let main = require('./router/main')
let email = require('./router/email')


app.listen(3000, function(){
    console.log(`start! express server on port 3000`)
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', "ejs")
app.use('/main', main)
app.use('/email', email)

//url routing
app.get('/', function(req, res){
    console.log('test')
    res.sendFile(__dirname + "/public/main.html")
})