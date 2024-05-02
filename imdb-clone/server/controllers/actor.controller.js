const Actors = require("../models/actor.model");
const mongoose = require("mongoose");

exports.getAllActors = async (req, res) => {
  try {
    Actors.find()
      .then((data) => {
        return res.status(200).send({
          message: "Actors have been retrieved successfully.",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while retrieving actors.",
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
exports.addActor = async (req, res) => {
  try {
    const payload = req.body;
    const newActor = new Actors(payload);
    newActor
      .save()
      .then((data) => {
        res.status(200).send({
          message: "Actor has been added successfully.",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: " Error while adding new actor.",
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

exports.updateActor = async (req, res) => {
  try {
    const actorId = req.params.actorId;
    const payload = req.body;
    Actors.updateOne({ _id: actorId }, { $set: { ...payload } })
      .then((data) => {
        res.status(200).send({
          message: "Actor has been updated successfully.",
          data: data,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Error while updating actor.",
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

exports.deleteActor = async (req, res) => {
  try {
    const actorId = req.params.actorId;
    const payload = req.body;
    Actors.deleteOne({ _id: actorId })
      .then((data) => {
        res.status(200).send({
          message: "Actor has been deleted successfully.",
          data: data,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Error while deleting actor.",
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
