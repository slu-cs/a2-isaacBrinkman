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

// Asynchronous line-by-line input
// for some reason this is running but not completeing
// drop the database
mongoose.connection.dropDatabase()
// then read the files
.then(()=>{
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
    allVoters.push(voter);
  });
})
// this should be a big number BUT ITS 0
.then(() => console.log(allVoters.length))
// then save all the values
.then(function(){
  for(const v of allVoters){
    v.save();
  }
})
// close the connection
.then(() => mongoose.connection.close())
// print it's ready
// THIS IS PRINTING BEFORE THE FILE READER IS DONE
.then(() => console.log('Database is ready'))
.catch(error => console.error(error.stack));

// End the program when the file closes
file.on('close', function() {
  process.exit(0);
});
