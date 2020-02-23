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

var p1 = new Promise(function(resolve, reject){
  var allVoters = [];
  // THis section works
  // Asynchronous line-by-line input
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
    })
    console.log(allVoters.push(voter));
    //console.log(allVoters.length);
  })
  console.log(allVoters.length);
});


/*  // reset the data
mongoose.connection.dropDatabase()
.catch(error => console.error(error.stack));
})
*/
p1.then(function(result) {
  console.log(result); // "Stuff worked!"
}, function(err) {
  console.log(err); // Error: "It broke"
});
/*
.then(() => mongoose.connection.dropDatabase())
.then(function(allVoters){
for (const v of allVoters){
v.save();
}
})
.then(() => console.log('Db is ready'))
.then(() => mongoose.connection.close())
.catch(error => console.error(error.stack));
*/
// End the program when the file closes
file.on('close', function() {
  process.exit(0);
});
