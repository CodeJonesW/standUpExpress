const router = require("express").Router();
const StandUp = require("../models/standUp.js");

// find all standUps
// dev only
router.get("/api/standUp", (req, res) => {
    StandUp.findAll().then(data => {
        res.json(data)
    })
    
});


// find all standUps relative to a userID
router.get("/api/standUp/:userId", (req, res) => {
    StandUp.findAll({ where: { userId: req.params.userId } }).then(data => {
        if (data === null) {
            res.send('Not found!');
          } else {
            res.json(data)
          }
    });
 
    
});

// create new standUp
router.post("/api/standUp", (req, res) => {
    console.log(req.body.blocker)
    let newStandup = StandUp.create({
        yesterday: req.body.yesterday,
        today: req.body.today,
        blocker: req.body.blocker,
        userId: req.body.userId
    })
    res.send(JSON.stringify(newStandup))
});


module.exports = router;



