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

    db.query("INSERT INTO shipments VALUES (?, ?, ?, ?, ?, ?, ?);", [req.body.routeNo, req.body.shipmentFee, req.body.status, req.body.departureDate, req.body.shipID, req.body.email], (err) => {
        if (err != null) {
            res.status(500).json("Error inserting into shipments!");
        }
        else {
            res.status(200).json("Succesfully inserted into shipments!");
        }
    })
});

shipmentsRouter.put("", (req, res) => {

    db.query("UPDATE shipments SET shipmentFee=ISNULL(?,shipmentFee), status=ISNULL(?,status), departureDate=ISNULL(?,departureDate) WHERE shipmentId=?", [req.body.shipmentFee, req.body.status, req.body.departureDate, req.body.shipmentID], (err) => {
        if (err != null) {
            res.status(500).json("Error updating row with " + req.body.shipmentID + " in shipments!");
        }
        else {
            res.status(200).json("Succesfully updated row with " + req.body.shipmentID + " in shipments!");
        }
    })
});

shipmentsRouter.delete("", (req, res) => {
    db.query("DELETE FROM shipments WHERE shipmentID=?;", [req.body.shipmentID], (err) => {
        if (err != null) {
            res.status(500).json("Error deleting row with " + req.body.shipmentID + " in shipments!");
        }
        else {
            res.status(200).json("Succesfully deleted row with " + req.body.shipmentID + " in shipments!");
        }
    })
});

shipmentsRouter.get("/primaryKey", (req, res) => {
    db.query("SELECT * FROM shipments WHERE shipmentID LIKE ?;", ["%" + req.query.shipmentID + "%"], (err, data) => {
        if (err != null) {
            res.status(500).json("Error getting shipments data where shipment id is " + req.query.shipmentID + "!");
        }
        else if (data.length === 0) {
            res.status(404).json("No shipments data found for shipment id " + req.query.shipmentID + "!")
        }
        else {
            res.status(200).json(data);
        }
    });
});

module.exports = shipmentsRouter;