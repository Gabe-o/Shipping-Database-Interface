const express = require('express');
const db = require('../DBConnect.js');

const shipsRouter = express.Router();

shipsRouter.get("", (req, res) => {
    db.query("SELECT * FROM ships", (err, data) => {
        if(err != null){
            res.status(500).json("Error getting ships data!")
        }
        else if(data.length === 0){
            res.json("Table ships has no data!");
        }
        else{
            res.json(data);
        }
    });
});

shipsRouter.post("", (req, res) => {

    db.query("INSERT INTO ships VALUES (?, ?, ?, ?, ?, ?);", [req.body.shipName, req.body.maxCargoWeight, req.body.captain, req.body.routeNo, req.body.maxRange, req.body.speed], (err) => {
        if(err != null){
            res.status(500).json("Error inserting into ships!");
        }
        else{
            res.status(200).json("Succesfully inserted into ships!");
        }
    })
});

module.exports = shipsRouter;