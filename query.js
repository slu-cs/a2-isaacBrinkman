// Query the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

const queries = [
  // number of voters in canton
  Voter.find().where('zip').equals(13617)

];

// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('Number of voters in Canton', results[0].length);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
