const express = require('express');
const app = express();
var cors = require('cors')
const {spawn} = require('child_process');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
app.use(cors())
app.use(bodyParser());
const port = 3000

var signal1 = 60
var signal2 = 60
var signal3 = 60
var signal4 = 60
const time = 60
function getSum(total, num) {
  return parseInt(total) + Math.round(num);
}


app.post("/",(req,res)=>{
  // if(parseInt(req.body.test)===1){
  //   console.log(req.body.test)
  //   res.send("35,2,1")
  // }
  if(0){
    console.log(Object.keys(req.body)[0].split("/")[4].split("."))
    let filenum = Object.keys(req.body)[0].split("/")[4].split(".")[0]
    let signalnum = Object.keys(req.body)[0].split("/")[4].split(".")[2]
    res.send("35,2,1")
  }
  else{
    let picName  = Object.keys(req.body)[0];
    let filenum = Object.keys(req.body)[0].split("/")[4].split(".")[0]
    let signalnum = Object.keys(req.body)[0].split("/")[4].split(".")[2]
    console.log(Object.keys(req.body)[0])
    var dataToSend;
    console.log(filenum)
    const python = spawn('python', ['predict.py',(filenum+".jpg")]);
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
       });
       python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        console.log(dataToSend)
        var ntime = Math.floor((dataToSend.split(",").reduce(getSum, 0)/40)*60)
        console.log(ntime)
        if(ntime <10){
          res.send(10 + "." + signalnum)
        }
        else{
          res.send(ntime+ "." + signalnum)
        }
        
        });
    // res.send("200")
  }

  });


app.listen(port, () => console.log(`Example app listening on port ${port}!`))