const Sequelize = require("sequelize")
const db = require("../database/data.js")

module.exports = db.sequelize.define(
    "products",
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type:Sequelize.STRING
        },
        price: {
            type:Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        mostpopular: {
            type: Sequelize.STRING
        }
        // created_time: {
        //     type: Sequelize.DATETIME
        // },
        // updated_time: {
        //     type: Sequelize.TIMESTAMP
        // }
    },
    {
        timestamps:false
    }  
)