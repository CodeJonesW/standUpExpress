const { DataTypes } = require('sequelize');
const sequelize = require("../db/sequelize");
const StandUp = require('./standUp');

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});



module.exports =  User