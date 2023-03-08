const express = require("express");
const router = express.Router();
const { User, Genre } = require("../models");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
    User.findAll()
      .then((usersArr) => {
        res.json(usersArr);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Something went wrong",
          err,
        });
      });
  });








  

