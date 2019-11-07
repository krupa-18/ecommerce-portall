const Sequelize = require("sequelize")
const db = require("../database/data.js")

module.exports = db.sequelize.define(
    "orders",
    {
        id:{
            type:Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type:Sequelize.BIGINT
        },
        b_name: {
            type:Sequelize.STRING
        },
        b_house_no: {
            type:Sequelize.STRING
        },
        b_city: {
            type:Sequelize.STRING
        },
        b_state : {
            type:Sequelize.STRING
        },
        b_zipcode: {
            type:Sequelize.BIGINT
        },
        b_mobile: {
            type: Sequelize.BIGINT
        },
        b_email:{
            type: Sequelize.STRING
        },
        s_name: {
            type:Sequelize.STRING
        },
        s_house_no: {
            type:Sequelize.STRING
        },
        s_city: {
            type:Sequelize.STRING
        },
        s_state : {
            type:Sequelize.STRING
        },
        s_zipcode: {
            type:Sequelize.BIGINT
        },
        s_mobile: {
            type: Sequelize.BIGINT
        },
        s_email:{
            type: Sequelize.STRING
        },
        total_amount:{
            type: Sequelize.DECIMAL
        },
        order_status:{
            type: Sequelize.TINYINT
        },
        name_in_card:{
            type: Sequelize.STRING
        },
        card_type:{
            type: Sequelize.STRING
        },
        exp_year:{
            type: Sequelize.BIGINT
        },
        payment_status:{
            type: Sequelize.TINYINT
        },
    },     
    {
        timestamps: false
    });