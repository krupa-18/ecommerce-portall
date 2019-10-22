var express = require("express")
var router = express.Router()
const Product = require("../model/Product")
const Sequelize = require('sequelize');
const Op =Sequelize.Op;

//app.use(express.json());
router.get("/products", (req,res)=>{
    Product.findAll()
        .then(products=>{
            res.json(products)
        })
        .catch(err => { 
            res.send("error:" +err)
        })
})
router.post('/addproducts', (req,res)=> {
    let { name, price, description, image, quantity } = req.body;
    let errors =[];

    if(!name) {
        errors.push({ text: 'please enter the product name'});
    }
    if(!price) {
        errors.push({ text: 'please enter the product name'});
    }
    if(!description) {
        errors.push({ text: 'please enter the product name'});
    }
    if(!image) {
        errors.push({ text: 'please enter the product name'});
    }
    if(!quantity) {
        errors.push({ text: 'please enter the product name'});
    }      
    if(errors.length > 0) {
        res.json(products);
    } else 
    {
        Product.create ({
            name, 
            price,
            description, 
            image,
            quantity
        })
        .then(products=>res.json(products))
        .catch(err => res.send("error:" +err));
    }
});

router.get('/search/:term', (req, res) => {
    const { term } = req.query;

    Product.findAll({ where: { name: { [Op.like]: '%'+ req.params.term + '%' } } })
    .then(products=>res.json(products))
    .catch(err => res.send("error:" +err));
});

router.get('/mostpopular', (req, res) => {
    const { term } = req.query;

    Product.findAll({ where: { mostpopular:1 } })
    .then(products=>res.json(products))
    .catch(err => res.send("error:" +err));
});


module.exports = router;