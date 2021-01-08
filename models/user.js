const { DataTypes } = require('sequelize');
const sequelize = require("../db/sequelize");
const StandUp = require('./standUp');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hash = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hash);
    },
  },
});



module.exports =  User