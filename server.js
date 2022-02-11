var express = require('express');
var app = express();

//This creates a pool for connection
const pool = require("./database")

//This helps you get information from the database passed 