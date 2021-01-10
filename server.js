const express = require("express");
const logger = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser")

const StandUp = require("./models/standUp.js");
const User = require("./models/user.js");
const sequelize = require("./db/sequelize.js");
const seeds = require("./db/seeds.js");
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));


app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use(express.static("public"));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});



// routes
app.use(require("./routes/standUpApi.js"));
app.use(require("./routes/userApi.js"));


app.listen(PORT, () => {
    sequelize.sync({ force: true }).then(() => {
        seeds.seedUsers()
        .then(() => seeds.seedStandUps())
        .then(() => {
            console.log("All models were synchronized successfully.");
            console.log(`App running on port ${PORT}!`);
            console.log("Seeds successfully seeded!")
            // console.log(process.env)
        })
    })
    // sequelize.sync().then(() => {
    //     console.log("All models were synchronized successfully.");
    //     console.log(`App running on port ${PORT}!`);
    // })
   

});