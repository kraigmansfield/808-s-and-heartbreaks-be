const express = require('express');
const router = express.Router();
const{Genre} = require("../models/Genre");
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

router.get('/', async (req,res) => {
    try{
        const genres = await Genre.findAll();
        
        res.json(genres);
    } catch (err) {
        console.log(err);
        res.json({
            msg: "Error",
            err
        });
    }
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