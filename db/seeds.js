const User = require("../models/user.js")
const StandUp = require("../models/standUp.js")
const sequelize = require("./sequelize")



 function seedUp(){
    let will = User.create({"name": "Will", "role": "boss"})
    let firstStandU = StandUp.create({"yesterday": "fixed it", "today": "boss moves", "blockers": "fixing things", "userId": "1"})
}



module.exports = seedUp