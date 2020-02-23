// Define a plan for a collection

const mongoose = require('mongoose');

// Schema for a colletion of voters
const Voter = new mongoose.Schema({
  firstname: String,
  lastname: String,
  zipcode: Number,
  history: [String]
});

// Speed up queries on all fields
Voter.index({firstname: 1});
Voter.index({lastname: 1});
Voter.index({zipcode: 1});
Voter.index({history: 1});

//Compile and export this Schema
module.exports = mongoose.model('Voter', Voter);
