var express = require("express")
var bodyParser = require("body-parser")

var products = require("./routes/products")
var cors = require("cors")
var path = require('path'); 

var port = 4000

var app = express()

path.join(__dirname, './images')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/", products)


app.listen(port, function(){
    console.log("Server started on port"+ port)
})