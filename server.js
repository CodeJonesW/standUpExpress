const express = require("express");
const logger = require("morgan");
const StandUp = require("./models/standUp.js");
const sequelize = require("./sequelize.js");
// const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

// app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// routes
app.use(require("./routes/api.js"));


app.listen(PORT, () => {
    sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");
 
  console.log(`App running on port ${PORT}!`);
});