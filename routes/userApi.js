const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { connect } = require("./standUpApi.js");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const StandUp = require("../models/standUp.js");
const jwtKey = process.env.jwtKey;
const jwtExpirySeconds = 300;

// find all users
// dev only
// router.get("/api/users", (req, res) => {
//     User.findAll().then(data => {
//         console.log(data)
//         res.json(data)
//     })

// });

// find user by id
// router.get("/api/users/:id", (req, res) => {
//     User.findAll({ where: { id: req.params.id } }).then(data => {
//         if (data === null) {
//             res.send('Not found!');
//           } else {
//             res.json(data)
//           }
//     });

// });

// create new user
router.post("/api/users", (req, res) => {
  console.log(req.body);
  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        User.create({
          email: req.body.email,
          password: req.body.password,
        })
          .then((response) => {
            res.json(response);
          })
          .catch((err) => res.send(err));
      } else {
        res.json({
          msg: "User already exists!",
        });
      }
    })
    .catch((err) => console.log(err));
});

// user login
router.options("/api/login", cors());
router.post("/api/login", async (req, res) => {
  let foundUser = await User.findOne({
    where: { email: req.body.email },
  });
  if (!foundUser) {
    res.status("404").send({ msg: "Invalid Email" });
  } else {
    bcrypt.compare(
      req.body.password,
      foundUser.password,
      function (err, result) {
        if (result == true) {
          const token = jwt.sign({ email: foundUser.email }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
          });
          // console.log("token:", token)
          console.log("password matched");
          res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
          res.send({
            userId: foundUser.id,
            loggedInStatus: true,
            token: token,
          });
        } else {
          res.send({ msg: "Incorrect password" });
        }
      }
    );
  }

  router.options("/api/user/refresh", cors());
  router.get("/api/user/refresh", async (req, res) => {
    // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route

    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
      return res.status(401).end();
    }

    let payload;
    try {
      payload = jwt.verify(token, jwtKey);
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        console.log("1asdf");
        return res.status(401).end();
      }
      console.log("2afds");
      return res.status(400).end();
    }

    // (END) The code uptil this point is the same as the first part of the `welcome` route

    // We ensure that a new token is not issued until enough time has elapsed
    // In this case, a new token will only be issued if the old token is within
    // 30 seconds of expiry. Otherwise, return a bad request status
    const nowUnixSeconds = Math.round(Number(new Date()) / 1000);

    if (payload.exp - nowUnixSeconds > 300) {
      return res.status(400).end();
    }

    // Now, create a new token for the current user, with a renewed expiration time
    const newToken = jwt.sign({ email: payload.email }, jwtKey, {
      algorithm: "HS256",
      expiresIn: jwtExpirySeconds,
    });

    User.findOne({ where: { email: payload.email } }).then((userData) => {
      StandUp.findAll({ where: { userId: userData.id } }).then(
        (standUpData) => {
          res.send({
            token: newToken,
            userId: userData.id,
            standUps: standUpData,
          });
        }
      );
    });
  });
});

module.exports = router;
