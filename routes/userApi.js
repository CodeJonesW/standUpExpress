const router = require("express").Router();
const User = require("../models/user.js");

// find all users
// dev only
router.get("/api/users", (req, res) => {
    User.findAll().then(data => {
        console.log(data)
        res.json(data)
    })
    
});


// find user by id
router.get("/api/users/:id", (req, res) => {
    User.findAll({ where: { id: req.params.id } }).then(data => {
        if (data === null) {
            res.send('Not found!');
          } else {
            res.json(data)
          }
    });
 
    
});

// create new user
router.post("/api/users", (req, res) => {
    console.log(User)
    let newUser = User.create({
        name: req.body.name,
        role: req.body.role,
    }).then(data => {
        res.send(JSON.stringify(data))
    })
    
});


module.exports = router;



