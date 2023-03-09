const express = require('express');
const router = express.Router();
const{Genre} = require("../models/Genre");
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();
const{Genre, User} = require("../models");
const jwt = require("jsonwebtoken");


router.use(express.json());



router.get("/", (req, res) => {
    Genre.findAll({
      include: {
        all: true,
        nested:true,
      },
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



router.get("/genres", (req, res) => {
    spotifyApi.getAvailableGenreSeeds()
    .then(function(data) {
      let genreSeeds = data.body;
      console.log(genreSeeds);
    }, function(err) {
      console.log('Something went wrong!', err);
    })
  });

module.exports=router;