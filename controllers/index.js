const express = require('express');
const router = express.Router();
const usersController = require("./usersController");
const genresController = require("./genresController");
const frontEndController = require("./frontEndController")

router.get("/sessionData",(req,res)=>res.json(req.session))

router.use("/api/genres",genresController)
router.use("/api/users",usersController)
router.use("/",frontEndController)

module.exports = router;