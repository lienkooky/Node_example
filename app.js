let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let index = require('./router/index')

app.listen(3000, function(){
    console.log(`start! express server on port 3000`)
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', "ejs")
app.use(index)
