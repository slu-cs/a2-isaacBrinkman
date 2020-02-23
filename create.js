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

const lee = new Professor({
  firstname: 'Choong-Soo Lee',
  lastname: 'Associate',
  zipcode: '2010',
  elections: [140, 219, 256, 321, 370]
});

var allVoters = [];
// Asynchronous line-by-line input
mongoose.connection.dropDatabase()
.then(() => {
  file.on('line', function(line) {
    var values= line.split(',');
    // put the election history into an array
    var str = values[3];
    var elections = [];
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
    voter.save();
    allVoters.push(voter);
  })
})
.then(() => {
  for(const v of allVoters){
    v.save();
  }
})
.then(() => console.log('Database is ready'))
.catch(error => console.error(error.stack));

// End the program when the file closes
file.on('close', function() {
  process.exit(0);
});
