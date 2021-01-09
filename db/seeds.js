const User = require("../models/user.js")
const StandUp = require("../models/standUp.js")
const sequelize = require("./sequelize")
const faker = require("faker")


 async function seedUsers(){
   let newUser = User.create({"name": "Will Jones", "email": "w@w.com", "password": "will"})
   
    for(let i = 0; i < 5; i++){   
      let newUser = User.create({"name": faker.name.findName(), "email": faker.internet.email(), "password": faker.hacker.verb()})
    }


}

  async function seedStandUps(){
      for(let i = 0; i < 50; i++){
      let newStandUp = StandUp.create({"yesterday": faker.hacker.phrase(), "today": faker.hacker.phrase(), "blocker": faker.hacker.phrase(), "userId": "1"  })
      }
  }



module.exports = {seedUsers: seedUsers, seedStandUps: seedStandUps}