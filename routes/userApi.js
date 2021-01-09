const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const { connect } = require("./standUpApi.js");

// find all users
// dev only
// router.get("/api/users", (req, res) => {
//     User.findAll().then(data => {
//         console.log(data)
//         res.json(data)
//     })
    
// });


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
    console.log(req.body)
    let newUser = User.create({
        password: req.body.password,
        email: req.body.email,
    }).then(data => {
        res.send({data, loggedInStatus: true})
    })
    
});

// implement web tokens?
router.post("/api/login", async (req, res) => {
    let foundUser = await User.findOne({
         where: {email: req.body.email}
    })
    if (!foundUser) {
        res.status("404").send("Invalid Email");
    } else {
        bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
            if (result == true) {
                console.log("password matched")
                res.send({userId: foundUser.id, loggedInStatus: true})
            } else {
                res.send('Incorrect Password')
            }
        });
    } 
})


module.exports = router;



