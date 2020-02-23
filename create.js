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

const promise1 = new Promise(function(){
  //asynch line-by-line input
  file.on('line', function(line){
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
    console.log('time to push voters');
    allVoters.push(voter);
  })
});

const promise2 = new Promise(function(){
  mongoose.connection.dropDatabase())
  console.log('insertion')
  for(const vote of allVoters){
      vote.save();
    }
});

Promise.all([promise1, promise2])
.then(() => console.log('Database is ready.'))
.then(()=>mongoose.connection.close())
.catch(error => console.error(error.stack));





// end the program
file.on('close', function(){
  process.exit(0);
});
