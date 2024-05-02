const Producers = require("../models/producer.model");
const mongoose = require("mongoose");

exports.getAllProducers = async (req, res) => {
  try {
    Producers.find()
      .then((data) => {
        return res.status(200).send({
          message: "Producers have been retrieved successfully.",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while retrieving producers.",
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
exports.addProducer = async (req, res) => {
  try {
    const payload = req.body;
    const newProducer = new Producers(payload);
    newProducer
      .save()
      .then((data) => {
        res.status(200).send({
          message: "Producer has been added successfully.",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: " Error while adding new producer.",
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

exports.updateProducer = async (req, res) => {
  try {
    const producerId = req.params.producerId;
    const payload = req.body;
    Producers.updateOne({ _id: producerId }, { $set: { ...payload } })
      .then((data) => {
        res.status(200).send({
          message: "Producer has been updated successfully.",
          data: data,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Error while updating producer.",
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

exports.deleteProducer = async (req, res) => {
  try {
    const producerId = req.params.producerId;
    const payload = req.body;
    Producer.deleteOne({ _id: producerId })
      .then((data) => {
        res.status(200).send({
          message: "Producer has been deleted successfully.",
          data: data,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Error while deleting producer.",
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
