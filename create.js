// Store some data in the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

// read the csv file
var file = readFile("voters.csv")
  .then(parse(data){
    console.log(data);
  })
  .catch(error => console.error(error.stack));


// Delete any previous data
mongoose.connection.dropDatabase()
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
