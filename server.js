// Setup empty JS array to act as endpoint for all routes
projectData = [];
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app =express();
// depencies
const bodyParser= require('body-parser');

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port=  5050;
const server= app.listen(port, listening);
// listening function to console out that the server is running 
function listening(){
    console.log(`the srver runing at port ${port}`);
}

// post request
app.post('/add', recieveData4mClient);
function recieveData4mClient(req, res){
    newEntry={
        date:req.body.date,
        temp:req.body.temp,
        content: req.body.content,
        cityName:req.body.cityName
    };
    projectData.push(newEntry);
    console.log(`${projectData} post `)
    res.send(projectData);
}
// get request 
app.get('/all', sendData2Client);
function sendData2Client(req, res){
    console.log(`${projectData} get `)
    res.send(projectData);
    // clearing projectdata array after sending it 
    projectData=[];
}
