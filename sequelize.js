const Sequelize = require("sequelize");
const StandUp = require("./models/standUp");

const sequelize = new Sequelize('standUp_DB', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
  })


const test = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    
}
test()



module.exports = sequelize