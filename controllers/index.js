const express = require('express');
const router = express.Router();

const usersRoutes = require("./usersController");
router.use("/api/users",usersRoutes);

const genreRoutes = require("./genreController");
router.use("/api/genres",genreRoutes);


module.exports = router;
