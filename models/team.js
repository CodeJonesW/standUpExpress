const { DataTypes } = require('sequelize');
const sequelize = require("../db/sequelize");

const Team = sequelize.define('team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  leader: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports =  Team