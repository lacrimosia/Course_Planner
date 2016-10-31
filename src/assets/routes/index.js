lti = require('ims-lti');
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

var debugModeOn = process.env.DEBUG == "true" || false;
if (debugModeOn){
  console.log("Debug Mode");
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/q', function(req, res) {
  res.send('hello world');
  console.log("I am working");
});
