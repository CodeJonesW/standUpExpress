const User = require("../models/user.js")
const StandUp = require("../models/standUp.js")
const sequelize = require("./sequelize")
const faker = require("faker")


 function seedUp(){
   let newUser = User.create({"name": "Will Jones", "email": "w@w.com", "password": "will"})
   
    for(let i = 0; i < 10; i++){   
      let newUser = User.create({"name": faker.name.findName(), "email": faker.internet.email(), "password": faker.hacker.verb()})
    }

    // for(let i = 0; i < 50; i++){
    //   let newStandUp = StandUp.create({"yesterday": faker.hacker.phrase(), "today": faker.hacker.phrase(), "blocker": faker.hacker.phrase(), "userId": Math.floor(Math.random() * 11)  })
    // }
}



module.exports = seedUp