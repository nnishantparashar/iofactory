const express = require("express");
const router = express.Router();
const { getAllMovies, addMovie, updateMovie, deleteMovie } = require("../controllers/movie.controller")
const { isAuth } = require("../utils/authentication");
//Get All Movie
router.get("/movies", getAllMovies);
//Add-Movie
router.post("/add-movie", isAuth, addMovie);
//Update-Producer
router.put("/update-movie/:movieId", isAuth, updateMovie);
//Delete-Producer
router.delete("/delete-movie/:movieId", isAuth, deleteMovie);


module.exports = router;