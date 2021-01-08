const express = require("express");
const logger = require("morgan");
const compression = require("compression");


const StandUp = require("./models/standUp.js");
const User = require("./models/user.js");
const sequelize = require("./db/sequelize.js");
const seedUp = require("./db/seeds.js");

const PORT = 3000;
const app = express();

app.use(logger("dev"));


app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

// routes
app.use(require("./routes/standUpApi.js"));
app.use(require("./routes/userApi.js"));


app.listen(PORT, () => {
    sequelize.sync({ force: true }).then(() => {
        seedUp()
    });
   
    console.log("All models were synchronized successfully.");
    console.log(`App running on port ${PORT}!`);
});