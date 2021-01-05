const router = require("express").Router();
const standUp = require("../models/standUp.js");


router.get("/api/standUp", (req, res) => {
    res.send("hello from the server")
});

module.exports = router;