const express = require('express');
const db = require('../DBConnect.js');

const routesRouter = express.Router();

routesRouter.get("", (req, res) => {
    db.query("SELECT * FROM routes", (err, data) => {
        if(err != null){
            res.status(500).json("Error getting routes data!")
        }
        else if(data.length === 0){
            res.json("Table routes has no data!");
        }
        else{
            res.json(data);
        }
    });
});

routesRouter.post("", (req, res) => {

    db.query("INSERT INTO routes VALUES (?, ?, ?);", [req.body.startingPortNo, req.body.endingPortNo, req.body.distance], (err) => {
        if(err != null){
            res.status(500).json("Error inserting into routes!");
        }
        else{
            res.status(200).json("Succesfully inserted into routes!");
        }
    })
});

module.exports = routesRouter;