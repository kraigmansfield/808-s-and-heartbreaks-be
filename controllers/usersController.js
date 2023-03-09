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


router.get('/:id',(req,res) => {
  User.findByPk(req.params.id, {
    include: [
      {
        model:Genre,
        as: "Like",
      },
      {
        model:Genre,
        as: "Dislike",
      }
    ]
  }).then(usersArr)
}).catch(err=>{
  console.log(err);
  res.status(500).json({
    msg: "Something went wrong",
    err,
  })
})



  

