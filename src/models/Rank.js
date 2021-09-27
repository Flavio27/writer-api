const mongoose = require("mongoose");

const rankSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  createAt: {
    type: Date,
    required: true
  }
}) 

module.exports = mongoose.model("Rank", rankSchema)