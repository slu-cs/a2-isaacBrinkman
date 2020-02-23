// Store some data in the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');
const readline = require('readline');
const fs = require('fs');

connect(); // To the database


var allVoters =[];
// file config
const file = readline.createInterface({
  input: fs.createReadStream("voters.csv")
});
//asynch line-by-line input
file.on('line')
  .then(function(line){
    var valArr = line.split(",");
    // need to split voting history
    var str = valArr[3];
    var elects = [];
    if(str !== undefined){
      for (var i =0; i< str.length; i+=4){
        elects.push(str.substring(i,i+4));
      }
    }
    const voter = new Voter({
      first_name: valArr[0],
      last_name: valArr[1],
      zip: valArr[2],
      elections: elects
    });
    allVoters.push(voter);
  })
.then(function(){
  // Delete any previous data
  mongoose.connection.dropDatabase()
    .then(function(voters){
      for(const vote of voters){
        vote.save()
      }
    })
    .then(() => console.log('Database is ready.'))
    .then(()=>mongoose.connection.close())
    .catch(error => console.error(error.stack));
});


// end the program
file.on('close', function(){
  process.exit(0);
});