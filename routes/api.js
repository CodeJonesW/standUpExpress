const router = require("express").Router();
const StandUp = require("../models/standUp.js");


router.get("/api/standUp", (req, res) => {
    StandUp.findAll().then(data => {
        console.log(data)
        res.json(data)
    })
    
});

router.post("/api/standUp", (req, res) => {
    StandUp.create({
        yesterday: 'fixess',
        today: "stuff to do",
        blocker: "getting it working"
      }).then(res => {
          res.send(res)
      });
    
});


module.exports = router;



