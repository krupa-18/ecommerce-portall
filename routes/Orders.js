var express = require("express")
var orders = express.Router()
const Order = require("../model/Order")
const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    } 
}
orders.post('/placeorder',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        var user_id = authData.id; 
        var orderdata = {
                user_id: user_id,
                b_name: req.body.b_name,
                b_house_no: req.body. b_house_no,
                b_city: req.body. b_city,
                b_state: req.body. b_state,
                b_mobile: req.body.b_mobile,
                b_email: req.body.b_email,
                b_zipcode: req.body.b_zipcode,
                s_name: req.body.s_name,
                s_house_no: req.body.s_house_no,
                s_city: req.body.s_city,
                s_state: req.body.s_state,
                s_zipcode: req.body.s_zipcode,
                s_mobile: req.body.s_mobile,
                s_email: req.body.s_email,
                total_amount: req.body.total_amount,
                name_in_card: req.body.name_in_card,
                card_type: req.body.card_type,
                exp_year: req.body.exp_year
            }   
        if(err) {
            res.sendStatus(403);
        } else {
            Order.create(orderdata)
            .then(()=> {
                res.send("Order placed successfully")

            })
            .catch(err => {
                res.send("Error: " +err)
            })
        }
    });
}); 
module.exports = orders;