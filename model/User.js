const Sequelize = require('sequelize')
const data = require('../database/data.js')

module.exports = data.sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    username: {
    type: Sequelize.STRING
    },
    email: {
    type: Sequelize.STRING
    },
    password: {
    type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.TIME,
        defaultValue: Sequelize.NOW
    }
    
  },
  {
    timestamps: false
  }
)