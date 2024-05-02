const mongoose = require("mongoose");

const movieActorSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Movies" ,
    },
    actorId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Actors",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MovieActors", movieActorSchema);
