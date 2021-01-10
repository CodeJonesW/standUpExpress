const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const { connect } = require("./standUpApi.js");
const jwt = require("jsonwebtoken")

const jwtKey = process.env.jwtKey
const jwtExpirySeconds = 300


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
    User.findOne({
        where: {email: req.body.email}
   }).then(user => {
        if (!user) {
          User.create({
            email: req.body.email,
            password: req.body.password
          })
            .then(response => {
              res.json(response);
            })
            .catch(err => console.log(err));
        } else {
          res.json({
            msg: "User already exists!"
          });
        }
      })
      .catch(err => console.log(err));
    
    
    
    
    // .then(data => {
    //     res.send({data, loggedInStatus: true})
    // })
    
});

// implement web tokens?
router.post("/api/login", async (req, res) => {
    let foundUser = await User.findOne({
         where: {email: req.body.email}
    })
    if (!foundUser) {
        res.status("404").send({ msg: "Invalid Email"});
    } else {
        bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
            if (result == true) {
                const token = jwt.sign({ email: foundUser.email }, jwtKey, {
                    algorithm: "HS256",
                    expiresIn: jwtExpirySeconds,
                })
                console.log("token:", token)
                console.log("password matched")
                res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
                res.send({userId: foundUser.id, loggedInStatus: true, token: token})
            } else {
                res.send({ msg: "Incorrect password"})
            }
        });
    } 
})


module.exports = router;



