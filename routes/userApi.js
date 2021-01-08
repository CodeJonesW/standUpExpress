const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require('bcrypt');
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


router.post("/api/login", async (req, res) => {

    console.log("this is my req.body", req.body)

    let foundUser = await User.findOne({
         where: {email: req.body.email}
    })

    if (!foundUser) {
        res.status("404").send("Invalid Email");
    } else {
        bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
            console.log(result)
            // if (result == true) {
            //     res.status("200").send(foundUser.dataValues);
            // } else {
            //     res.status("404").send("Incorrect Password");
            // }
        });
    }
  
})


module.exports = router;



