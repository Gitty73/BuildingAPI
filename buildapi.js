const express = require("express"),
    bodyParser = require("body-parser");
    
//create express app
    
const app = express();

//parse request of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended: true}));

//parse request of content-type - application/json

app.use(bodyParser.json());

//configuring database

const dbconfig = require("./config/dbconfig.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//connecting to tha database

mongoose.connect(dbconfig.url)
.then (() => {
    console.log("Connected to the database successfully!");
}).catch(err => {
    if (err)
    console.log("Could not connected to the database...Exiting now..");
    process.exit();
});

//simple route

app.get("/", (req, res) => {
    res.json({message: "Hi, there"});
});

//requiring note routes

require("./app/routes/note.route.js")(app);

// server route

app.listen(process.env.PORT, process.env.IP, () => {
   console.log("Server has started..."); 
});