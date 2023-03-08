const express = require('express');
const router = express.Router();
const usersController = require("./usersController");
const genreController = require("./genreController");

router.get("/sessionData",(req,res)=>res.json(req.session))

router.use("/api/genres",genreController)
router.use("/api/users",usersController)


module.exports = router;
