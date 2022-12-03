const express = require('express');
const db = require('../DBConnect.js');

const portsRouter = express.Router();

portsRouter.get("", (req, res) => {
    db.query("SELECT * FROM ports", (err, data) => {
        if(err != null){
            res.status(500).json("Error getting ports data!")
        }
        else if(data.length === 0){
            res.json("Table ports has no data!");
        }
        else{
            res.json(data);
        }
    });
});

portsRouter.post("", (req, res) => {

    db.query("INSERT INTO ports VALUES (?, ?, ?, ?, ?, ?);", [req.body.portNo, req.body.region, req.body.portName, req.body.country, req.body.latitude, req.body.longitude], (err) => {
        if(err != null){
            res.status(500).json("Error inserting into ports!");
        }
        else{
            res.status(200).json("Succesfully inserted into ports!");
        }
    })
});

module.exports = portsRouter;