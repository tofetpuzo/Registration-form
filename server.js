var express = require('express');
var app = express();

//This creates a pool for connection
const pool = require("./database");

//This helps you get information from the database passed 
const{parse} = require("querystring");

//This helps read the html file
var fs = require("fs");
app.get("/reg", function(req. res){
    //This code is to read data from file
    fs.readFile("./reg_form.html", "utf8", function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(data);
    });
});