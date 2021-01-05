const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");

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

module.exports =  StandUp