const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



const User = require('../model/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.username  + 'Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      } else {
        res.status(400).json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
})
// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers['authorization'];
//   // Check if bearer is undefined
//   if(typeof bearerHeader !== 'undefined') {
//     // Split at the space
//     const bearer = bearerHeader.split(' ');
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }

// }

// users.post('/addtocart',  verifyToken, (req, res) => {
// //   var cartData = {
// //     id: req.body.id,
// //     user_id: req.authData.id,
// //     product_id: req.body.product_id,
// //     product_title: req.body. product_title,
// //     product_description: req.body. product_description,
// //     product_price: req.body. product_price,
// //     product_logo: req.body. product_logo,
// //     no_of_items: req.body.no_of_item 
// // }   
//   jwt.verify(req.token, 'secret', (err, authData) => {
//       if(err) {
//         res.sendStatus(403);
//       } else {
//           res.json({
//             message: 'Post created...',
//             authData
//           })
//         }
//       });
//     });


module.exports = users;
