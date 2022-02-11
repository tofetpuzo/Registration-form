var express = require('express');
var app = express();

//This creates a pool for connection
const pool = require("./database");

//This helps you get information from the database passed 
const { parse } = require("querystring");

//This helps read the html file
var fs = require("fs");
const { compileFunction } = require('vm');
app.get("/reg", function (req, res) {
    //This code is to read data from file
    fs.readFile("./reg_form.html", "utf8", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data);
    });
});

app.get("/:id", async function (req, res) {
    try {
        const SQLquery = 'SELECT * FROM users where user_id';
        //This will help the function wait for further calls
        const rows = await pool.query(SQLquery, data.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

//This function in req and res takes care of the request from the reg form
app.post("/addUser", async function (req, res) {
    try {
        await collectionRequestData(req, data => {
            console.log(data);
            const data_info = [data.fname, data.lname, data.profession, data.gender];
            const SQLquery = 'INSERT INTO users(firstname, lastname, profession, gender) VALUES(?,?,?,?)';
            const result = pool.query(SQLquery, data_info);
            res.status(200).send("successfully added...Thank you")
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
});

async function collectionRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunck.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    } else {
        callback(null);
    }
}

var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("server running at http://%s:%: ", host, port);
});