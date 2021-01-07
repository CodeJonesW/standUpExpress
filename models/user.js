const { DataTypes } = require('sequelize');
const sequelize = require("../db/sequelize");
const StandUp = require('./standUp');
const Team = require("./team")
const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
});



module.exports =  User