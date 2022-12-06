const express = require('express');
const db = require('../DBConnect.js');

const shipmentsRouter = express.Router();

shipmentsRouter.get("", (req, res) => {
    db.query("SELECT * FROM shipments", (err, data) => {
        if (err != null) {
            res.status(500).json("Error getting shipments data!")
        }
        else if (data.length === 0) {
            res.status(404).json("Table shipments has no data!");
        }
        else {
            res.status(200).json(data);
        }
    });
});

shipmentsRouter.post("", (req, res) => {

    db.query("INSERT INTO shipments (routeNo, shipmentFee, status, departureDate, shipID, email) VALUES (?, ?, ?, ?, ?, ?);", [req.body.routeNo, req.body.shipmentFee, req.body.status, req.body.departureDate, req.body.shipID, req.body.email], (err) => {
        if (err != null) {
            res.status(500).json("Error inserting into shipments!");
        }
        else {
            res.status(200).json("Succesfully inserted into shipments!");
        }
    })
});

shipmentsRouter.put("", (req, res) => {

    db.query("UPDATE shipments SET shipmentFee=IFNULL(?,shipmentFee), status=IFNULL(?,status), departureDate=IFNULL(?,departureDate) WHERE shipmentNo=?", [req.body.shipmentFee, req.body.status, req.body.departureDate, req.body.shipmentNo], (err) => {
        console.log(req.body);
        if (err != null) {
            console.log(err)
            res.status(500).json("Error updating row with " + req.body.shipmentNo + " in shipments!");
        }
        else {
            res.status(200).json("Succesfully updated row with " + req.body.shipmentNo + " in shipments!");
        }
    })
});

shipmentsRouter.delete("", (req, res) => {
    db.query("DELETE FROM shipments WHERE shipmentNo=?;", [req.body.shipmentNo], (err) => {
        if (err != null) {
            res.status(500).json("Error deleting row with " + req.body.shipmentNo + " in shipments!");
        }
        else {
            res.status(200).json("Succesfully deleted row with " + req.body.shipmentNo + " in shipments!");
        }
    })
});

shipmentsRouter.get("/primaryKey", (req, res) => {
    db.query("SELECT * FROM shipments WHERE shipmentNo LIKE ?;", ["%" + req.query.shipmentNo + "%"], (err, data) => {
        if (err != null) {
            res.status(500).json("Error getting shipments data where shipment id is " + req.query.shipmentNo + "!");
        }
        else if (data.length === 0) {
            res.status(404).json("No shipments data found for shipment id " + req.query.shipmentNo + "!")
        }
        else {
            res.status(200).json(data);
        }
    });
});

shipmentsRouter.get("/shipmentNumber", (req, res) => {
    db.query("SELECT shipmentNo, routeNo, shipID, ROUND((shipmentFee/0.05), 2) AS weight FROM se3309_assignment4_database.shipments;", (err, data) => {
        if(err){
            console.log(error);
        }
        else{
            res.status(200).json(data);
        }
        
    });
});

module.exports = shipmentsRouter;