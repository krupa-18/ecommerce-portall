const Sequelize = require("sequelize")
const db = require("../database/data.js")

module.exports = db.sequelize.define(
    "carts",
    {
        id:{
            type:Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type:Sequelize.BIGINT
        },
        product_id: {
            type:Sequelize.BIGINT
        },
        product_title: {
            type:Sequelize.STRING
        },
        product_description: {
            type:Sequelize.TEXT
        },
        product_price : {
            type:Sequelize.DECIMAL
        },
        product_logo: {
            type:Sequelize.STRING
        },
        no_of_items: {
            type: Sequelize.BIGINT
        },
        delete_flag:{
            type: Sequelize.TINYINT
        },
    },     
    {
        timestamps: false
    });
