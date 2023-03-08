const express = require('express');
const router = express.Router();
const{Genre} = require("../models/Genre");

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

module.exports=router;