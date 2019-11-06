var express = require("express")
var bodyParser = require("body-parser")
var products = require("./routes/products")
var Carts = require("./routes/Carts")
var cors = require("cors")

//var port = 4000

var app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


var Users = require('./routes/Users')


app.use('/users', Users)

app.use("/", products)

app.use('/carts', Carts)

var server = app.listen(4000, function () {
 
  var host = server.address().address
  var port = server.address().port
  
  console.log("App listening at http://%s:%s", host, port)
  });
