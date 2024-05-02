const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    yearOfRelease:{
        type: String,
        required:true,
        trim:true,
    },
    plot: {
      type: String,
      required: true,
      trim: true,
    },
    poster: {
        type:String,
        required:true,
        trim:true,
    },
    producer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Producers' ,
    },
    actors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Actors'}],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movies", movieSchema);
