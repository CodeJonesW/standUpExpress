const router = require("express").Router();
const StandUp = require("../models/standUp.js");
const User = require("../models/user.js");
const cors = require("cors")


const jwt = require("jsonwebtoken")

const jwtKey = process.env.jwtKey
const jwtExpirySeconds = 300


// find all standUps
// dev only
// router.get("/api/standUp", (req, res) => {
//     StandUp.findAll().then(data => {
//         res.json(data)
//     })
    
// });


// find all standUps relative to a userID
router.get("/api/standUp/:userId", (req, res) => {
    // console.log(req.headers)
    // const token = req.cookies.token
    const token = req.headers.authorization
	// if the cookie is not set, return an unauthorized error
	if (!token) {
		return res.status(401).end()
    }
    
    let payload
	try {

		payload = jwt.verify(token, jwtKey)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
			return res.status(401).end()
		}
		// otherwise, return a bad request error
		return res.status(400).end()
    }
    console.log(payload)



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
router.options('/api/standUp', cors())
router.post("/api/standUp", (req, res) => {

    // console.log(req.headers)

    const token = req.headers.authorization
	// if the cookie is not set, return an unauthorized error
	if (!token) {
		return res.status(401).end()
    }
    
    let payload
	try {

		payload = jwt.verify(token, jwtKey)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
			return res.status(401).end()
		}
		// otherwise, return a bad request error
		return res.status(400).end()
    }
    console.log(payload)


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

    const token = req.headers.authorization
	// if the cookie is not set, return an unauthorized error
	if (!token) {
		return res.status(401).end()
    }
    
    let payload
	try {
		payload = jwt.verify(token, jwtKey)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
			return res.status(401).end()
		}
		// otherwise, return a bad request error
		return res.status(400).end()
    }

    let standUpForDelete = await StandUp.findOne({where: {id: req.params.id}})
    if(!standUpForDelete){
        res.send({msg: "StandUp does not exist"})
    }else {
        await standUpForDelete.destroy()
        res.send({msg:`StandUp was deleted`})
    }

})

router.options('/api/standUp/:standUpId', cors())
router.post("/api/standUp/:standUpId", async (req, res) => {

    const token = req.headers.authorization
	// if the cookie is not set, return an unauthorized error
	if (!token) {
		return res.status(401).end()
    }
    
    let payload
	try {
		payload = jwt.verify(token, jwtKey)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
			return res.status(401).end()
		}
		// otherwise, return a bad request error
		return res.status(400).end()
    }



    let standUpToUpdateId = req.params.standUpId
    let standUpToUpdate = await StandUp.findOne({where: {id: standUpToUpdateId}})

    if(!standUpToUpdate){
        res.send({msg: "StandUp does not exist"})
    }else {
        standUpToUpdate.complete = !standUpToUpdate.complete
        await standUpToUpdate.save()
        let refreshedStandUps = await StandUp.findAll({where: {userId: standUpToUpdate.userId}})
        res.send({"message": "Updated", "standUps": refreshedStandUps})
    }

})




module.exports = router;



