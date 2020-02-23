// Store some data in the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');
const readline = require('readline');
const fs = require('fs');

connect(); // To the database

// File configuration
const file = readline.createInterface({
  input: fs.createReadStream("voters.csv")
});

// Asynchronous line-by-line input
file.on('line', function(line) {
  var values= line.split(',');

  // put the election history into an array
  var str = values[3];
  var elections = [];
  if(str !== undefined){ // if they ever voted
    for (var i = 0; i < str.length; i=i+4) {
      elects.push(str.substring(i, i+4));
    }
  }
  const voter = new Voter({
    first_name: values[0],
    last_name: values[1],
    zip: values[2],
    elections: elects
  });

  // reset the data
  mongoose.connection.dropDatabase()
    .then(() => voter.save())
    .then(() => mongoose.connection.close())
    .then(() => console.log('Database is ready.'))
    .catch(error => console.error(error.stack));
});

// End the program when the file closes
file.on('close', function() {
  process.exit(0);
});
