/**DEPENDENCIES ALSO VIEW THE PACKAGE JSON FILE */
let express = require("express");
const req = require("express/lib/request");
const { json } = require("express/lib/response");
let app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
/*****************************************************/



/** 1: Meet the node console */
console.log("Hello World");
/*************************** */


/**2: Start a working express server */
app.get("/", ( req, res ) => {
    res.send("Hello Express" );
})
/*********************************** */

/**3: Server an html file */
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})
//__dirname calculates the file path.
/************************************* */


/**4: Serve Static Files */
app.use("/public", express.static(__dirname + "/public"));
/********************************************************* */


/**5: Serve JSON on  a specific route */
app.get("/json", (req, res) => {
    res.json({
        message: "Hello json"
    })
})
/********************************************** */



/**6: Use the .env file */
app.get("/json", (req, res) => {
    if(process.env.MESSAGE_STYLE === "uppercase") {
        res.json({message: "HELLO JSON"})
    } else {
        res.json({message: "Hello json"})
    }
})

/******************************************** */

/**7: Implement a Root-Level Request Logger Middleware */
app.get("/json" , (req, res, next) => {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string)
    next();
})

/************************************************* */

/**8: Chain Middleware to create a Time Server */

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({
        time: req.time
    })
})

/********************************************************** */

/**9: Get Route Parameter From the Client */
app.get("/:word/echo", (req, res) => {
    res.json({
        echo: req.params.word
    })
})

/*********************************************************** */

/**10: Get Query Parameter Input from the Client */

app.get("/name", (req, res) => {
    res.json({
        name: req.query.first + " " + req.query.last
    })
})

/******************************************************* */

/**11: Use body-parser to Parse POST Request*/
app.use(bodyParser.urlencoded({ extended: false }));

/***************************************************** */

/**12: Get Data from POST Requests */
app.post("/name", (req, res) => {
    let words = req.body.first + " " + req.body.last
    res.json({
        name: words
    })
})

/************************************************************* */

module.exports = app;