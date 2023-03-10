const express = require('express');
const router = express.Router();

const usersRoutes = require("./usersController");
router.use("/api/users",usersRoutes);

const genreRoutes = require("./genreController");
router.use("/api/genres",genreRoutes);

const spotifyRoutes = require("./SpotifyAPI");
router.use("/api/spotify",spotifyRoutes);


module.exports = router;
