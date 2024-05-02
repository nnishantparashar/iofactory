const mongoose = require("mongoose");

const producerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
        type:String,
        required:true,
        trim:true,
    },
    bio: {
        type:String,
        required:true,
        trim:true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Producers", producerSchema);
