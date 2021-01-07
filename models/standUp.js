const { DataTypes } = require('sequelize');
const sequelize = require("../db/sequelize");
const User = require("./user")


const StandUp = sequelize.define('standUp', {
  yesterday: {
    type: DataTypes.STRING,
    allowNull: false
  },
  today: {
    type: DataTypes.STRING,
    allowNull: false
  },
  blocker: {
    type: DataTypes.STRING
  }
});

StandUp.belongsTo(User)

module.exports =  StandUp