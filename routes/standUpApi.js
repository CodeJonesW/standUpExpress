const router = require("express").Router();
const StandUp = require("../models/standUp.js");
const User = require("../models/user.js");
const cors = require("cors")
// find all standUps
// dev only
router.get("/api/standUp", (req, res) => {
    StandUp.findAll().then(data => {
        res.json(data)
    })
    
});


// find all standUps relative to a userID
router.get("/api/standUp/:userId", (req, res) => {
    StandUp.findAll({ where: { userId: req.params.userId },
         order: [
        ['id', 'DESC'],
        ['createdAt', 'ASC'],
    ], }).then(data => {
        if (data === null) {
            res.send('Not found!');
          } else {
            res.json(data)
          }
    });
 
    
});

// create new standUp
router.post("/api/standUp", (req, res) => {
    console.log(req.body)
    let newStandup = StandUp.create({
        yesterday: req.body.yesterday,
        today: req.body.today,
        blocker: req.body.blocker,
        userId: req.body.userId
    }).then(data => {
        User.findOne({where: {id: data.id}})
        res.json(data)
    })

    
});

 // enable pre-flight request for DELETE request
router.options('/api/standUp/:id', cors())
router.delete("/api/standUp/:id", cors(), async (req, res) => {
    let standUpForDelete = await StandUp.findOne({where: {id: req.params.id}})
    if(!standUpForDelete){
        res.send({msg: "StandUp does not exist"})
    }else {
        await standUpForDelete.destroy()
        res.send({msg:`StandUp was deleted`})
    }

})




module.exports = router;



