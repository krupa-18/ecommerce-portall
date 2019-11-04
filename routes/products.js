var express = require("express")
var router = express.Router()
const Product = require("../model/Product")
const Cart = require("../model/Cart")
const Sequelize = require('sequelize');
const Op =Sequelize.Op;
const jwt = require("jsonwebtoken")

router.get("/products", (req,res)=>{
    Product.findAll()
    .then(products=>{
        res.json(products)
    })
    .catch(err => { 
        res.send("error:" +err)
    })
});
router.get('/mostpopular', (req, res) => {
    const { term } = req.query;

    Product.findAll({ where: { mostpopular:1 } })
    .then(products=>res.json(products))
    .catch(err => res.send("error:" +err));
});
router.get('/search/:term', (req, res) => {
    const { term } = req.query;

    Product.findAll({ where: { name: { [Op.like]: '%'+ req.params.term + '%' } } })
    .then(products=>res.json(products))
    .catch(err => res.send("error:" +err));
});
router.get('/productdetail/:id', (req, res) => {
    Product.find({ where: {
        id: req.params.id
     } })
    .then(products=>res.json(products))
    .catch(err => res.send("error:" +err));
});
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
  
router.post('/addtocart',  verifyToken, (req, res) => {
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
  
router.get('/getcartitemsbyuserid/:user_id', (req, res) => {
    Cart.findAll({ where: {
      user_id: req.params.user_id
     } })
    .then(cartproducts=>res.json(cartproducts))
    .catch(err => res.send("error:" +err));
});
router.delete("/deletecart/:id", (req,res)=>{
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
});


module.exports = router;