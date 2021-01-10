const User = require("../models/user.js")
const StandUp = require("../models/standUp.js")
const sequelize = require("./sequelize")
const faker = require("faker")


 async function seedUsers(){
   await User.create({"name": "Will Jones", "email": "w@w.com", "password": "will"})
   await User.create({"name": "Loni Davis", "email": "l@l.com", "password": "will"})
   
    for(let i = 0; i < 5; i++){   
      await User.create({"name": faker.name.findName(), "email": faker.internet.email(), "password": faker.hacker.verb()})
    }


}

  async function seedStandUps(){
      for(let i = 1; i < 10; i++){
      await StandUp.create({"yesterday": faker.hacker.phrase(), "today": faker.hacker.phrase(), "blocker": faker.hacker.phrase(), "userId": "1"  })
      await StandUp.create({"yesterday": faker.hacker.phrase(), "today": faker.hacker.phrase(), "blocker": faker.hacker.phrase(), "userId": "2"  })
      await StandUp.create({"yesterday": faker.hacker.phrase(), "today": faker.hacker.phrase(), "blocker": faker.hacker.phrase(), "userId": "3"  })
      }
  }



module.exports = {seedUsers: seedUsers, seedStandUps: seedStandUps}