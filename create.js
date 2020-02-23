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


var allVoters = [];
// read the file line by line
file.on('line', function(line) {
  // split by ,
  var values= line.split(',');
  // put the election history into an array
  var str = values[3];
  var elections = [];
  // this is to get the elections
  if(str !== undefined){ // if they ever voted
    for (var i = 0; i < str.length; i=i+4) {
      elections.push(str.substring(i, i+4));
    }
  }
  const voter = new Voter({
    firstname: values[0],
    lastname: values[1],
    zipcode: values[2],
    history: elections
  });
  // push the voter to an empty array
  allVoters.push(voter);
});



// Once the file is done do all the mongo stuff
file.on('close', function() {
  // drop the db
  mongoose.connection.dropDatabase()
  // using Promise and map save voters
  .then(() => Promise.all(allVoters.map(voter => voter.save())))
  // close the connection
  .then(() => mongoose.connection.close())
  // print it's ready
  .then(() => console.log('Database is ready'))
  // then exit
  .then(() => process.exit(0))
  .catch(error => console.error(error.stack))
});
