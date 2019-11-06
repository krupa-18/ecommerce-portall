var express = require("express")
var router = express.Router()
const Product = require("../model/Product")
const Sequelize = require('sequelize');
const Op =Sequelize.Op;

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

module.exports = router;