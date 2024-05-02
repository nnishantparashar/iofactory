const express = require("express");
const router = express.Router();
const { isAuth } = require("../utils/authentication");
const { addProducer, updateProducer, deleteProducer, getAllProducers } = require("../controllers/producer.controller");

//Get All Producers
router.get("/producers", getAllProducers);
//Add-Producer
router.post("/add-producer", isAuth, addProducer);
//Update-Producer
router.put("/update-producer/:producerId", isAuth, updateProducer);
//Delete-Producer
router.delete("/delete-producer/:producerId", isAuth, deleteProducer);


module.exports = router;