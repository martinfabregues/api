var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

 
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set('port', process.env.PORT || 8001);
 
require('./app/routes/cliente')(app);
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});