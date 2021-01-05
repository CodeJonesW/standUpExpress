const router = require("express").Router();
const StandUp = require("../models/standUp.js");


router.get("/api/standUp", (req, res) => {
    StandUp.findAll().then(data => {
        console.log(data)
        res.json(data)
    })
    
});

module.exports = router;