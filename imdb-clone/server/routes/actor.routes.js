const express = require("express");
const router = express.Router();
const { addActor, updateActor, deleteActor, getAllActors } = require("../controllers/actor.controller");
const { isAuth } = require("../utils/authentication");

//Get All Actors
router.get("/actors", getAllActors);
//Add-Actor
router.post("/add-actor", isAuth, addActor);
//Update-Actor
router.put("/update-actor/:actorId", isAuth, updateActor);
//Delete-Actor
router.delete("/delete-actor/:actorId", isAuth, deleteActor);


module.exports = router;