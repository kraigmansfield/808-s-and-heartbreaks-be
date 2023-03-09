const express = require('express');
const router = express.Router();

const app = express();

const usersRoutes = require("./usersController");
app.set("/api/users",usersRoutes);

const genreRoutes = require("./genreController");
app.set("/api/genres",genreRoutes);


module.exports = router;
