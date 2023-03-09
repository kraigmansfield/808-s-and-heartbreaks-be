const express = require('express');
const router = express.Router();
const{Genre, User} = require("../models");
const jwt = require("jsonwebtoken");

router.use(express.json());



router.get("/", (req, res) => {
    Genre.findAll({
      include: [User],
    })
      .then((allGenres) => {
        res.json(allGenres);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "An error has occurred",
          err,
        });
      });
    });



module.exports=router;