const router = require("express").Router();
const StandUp = require("../models/standUp.js");


router.get("/api/standUp", (req, res) => {
    StandUp.findAll().then(data => {
        console.log(data)
        res.json(data)
    })
    
});

router.post("/api/standUp", (req, res) => {
    console.log(req.body)
    let newStandup = StandUp.create({
        yesterday: req.body.yesterday,
        today: req.body.today,
        blocker: req.body.blocker,
        userId: req.body.userId
    })
    res.send(JSON.stringify(newStandup))
});


module.exports = router;



