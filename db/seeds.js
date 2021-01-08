const User = require("../models/user.js")
const StandUp = require("../models/standUp.js")
const sequelize = require("./sequelize")
const faker = require("faker")


 function seedUp(){
     for(let i = 0; i < 100; i++){
        let newUser = User.create({"name": faker.name.findName(), "email": faker.internet.email(), "password": faker.hacker.verb()})
        let newStandUp = StandUp.create({"yesterday": faker.hacker.phrase(), "today": faker.hacker.phrase(), "blocker": faker.hacker.phrase(), "userId": Math.floor(Math.random() * 101)  })
     }
}



module.exports = seedUp