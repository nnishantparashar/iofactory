const Movies = require("../models/movie.model");
const Producers = require("../models/producer.model");
const Actors = require("../models/actor.model");
const MovieActors = require("../models/movieActor.model");
const mongoose = require("mongoose");
exports.getAllMovies = async (req, res) => {
  try {
    Movies.find()
      .populate("producer")
      .populate("actors")
      .then((data) => {
        return res.status(200).send({
          message: "Movies have been retrieved successfully.",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while retrieving movies.",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal server Error.",
      error: error,
    });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const payload = req.body;
    const { name, yearOfRelease, plot, poster, actors, producer } = payload;
    const prod = await Producers.findOne({ name: producer });
    const producerId = prod._id;
    const actorsList = await Actors.find({ name: { $in: actors } });
    const actorsIds = actorsList.map((actor) => actor._id);
    const movieData = {
      name: name,
      yearOfRelease: yearOfRelease,
      plot: plot,
      poster: poster,
      producer: producerId,
      actors: actorsIds,
    };

    const newMovie = new Movies(movieData);
    newMovie
      .save()
      .then((data) => {
        res.status(200).send({
          message: "Movie has been added successfully.",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: " Error while adding new movie.",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal server Error.",
      error: error,
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const payload = req.body;
    Movies.updateOne({ _id: movieId }, { $set: { ...payload } })
      .then((data) => {
        res.status(200).send({
          message: "Movie has been updated successfully.",
          data: data,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Error while updating movie.",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal server Error.",
      error: error,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    Movies.deleteOne({ _id: movieId })
      .then((data) => {
        res.status(200).send({
          message: "Movie has been deleted successfully.",
          data: data,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Error while deleting movie.",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal server Error.",
      error: error,
    });
  }
};


