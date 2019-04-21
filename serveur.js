const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "keijo"
});

app.get("/", function(req,res){
    res.send("Hello Keijo !");
});

//INSERTION player
app.post("/api/player", function(req,res){
    console.log("Received", req.body);
    connection.connect(function(err){
        const sql = 'insert into player set ?';
        const value = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            style: req.body.style
        };
        connection.query(sql,value, function(err,result,fields){
            if(err){
                console.log(err);
                res.send(503).end();
            } else {
                console.log("INSERT successful", result);
                res.end();
            }
        });
    });
});

//SELECT player
app.get("/api/player", function(req,res){
    connection.connect(function(err){
        connection.query("select * from player", function(err,result,fields){
            res.json(result);
        });
    });
});

app.listen(1000);