const express = require('express');
const db = require('../DBConnect.js');

const shipmentsRouter = express.Router();

shipmentsRouter.get("", (req, res) => {
    db.query("SELECT * FROM shipments", (err, data) => {
        if(err != null){
            res.status(500).json("Error getting shipments data!")
        }
        else if(data.length === 0){
            res.json("Table shipments has no data!");
        }
        else{
            res.json(data);
        }
    });
});

shipmentsRouter.post("", (req, res) => {

    db.query("INSERT INTO shipments VALUES (?, ?, ?, ?, ?, ?, ?);", [req.body.routeNo, req.body.shipmentFee, req.body.status, req.body.departureDate, req.body.shipID, req.body.email], (err) => {
        if(err != null){
            res.status(500).json("Error inserting into shipments!");
        }
        else{
            res.status(200).json("Succesfully inserted into shipments!");
        }
    })
});

module.exports = shipmentsRouter;