var express = require("express")
var carts = express.Router()
const Cart = require("../model/Cart")
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
carts.get('/getcartitemsbyuserid',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        var user_id = authData.id; 
        if(err) {
            res.sendStatus(403);
        } else {
            Cart.findAll({ where: {
            user_id: user_id
            } })
            .then(cartproducts=>res.json(cartproducts))
            .catch(err => res.send("error:" +err));
        }
    })
}); 
carts.post('/addtocart',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        var user_id = authData.id; 
        var cartData = {
                user_id:user_id,
                product_id: req.body.product_id,
                product_title: req.body. product_title,
                product_description: req.body. product_description,
                product_price: req.body. product_price,
                product_logo: req.body. product_logo,
                no_of_items: req.body.no_of_items
            }   
        if(err) {
            res.sendStatus(403);
        } else {
            Cart.create(cartData)
            .then(()=> {
                res.send("Cart item Added")

            })
            .catch(err => {
                res.send("Error: " +err)
            })
        }
    });
}); 
carts.put("/updatecart/:id", (req, res)=> {
    jwt.verify(req.token, 'secret', (err, authData) => {
    Cart.update(
        { no_of_items: req.body.no_of_items }, 
        { where: { id: req.params.id }}
    )
    .then(()=> {
        res.send("Cart Updated")
    })
    .error(err => res.send(err))
})

})
carts.delete("/deletecart/:id", verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secret', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else { 
            Cart.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(()=> {
                res.send("cart product Deleted")
            })
            .catch(err => {
                res.send("error: "+ err)
            })
        }
    })
});

module.exports = carts;