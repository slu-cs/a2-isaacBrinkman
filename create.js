// Store some data in the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

// read the csv file
var file = readFile("voters.csv", parse(err,data) {
  if(err) console.error(err.stack);
  console.log(data);
})

// Delete any previous data
mongoose.connection.dropDatabase()
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
