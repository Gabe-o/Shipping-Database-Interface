const express = require('express');
const db = require('../DBConnect.js');

const shipmentDatesRouter = express.Router();

shipmentDatesRouter.get("", (req, res) => {
    db.query("SELECT * FROM shipmentdates", (err, data) => {
        if (err != null) {
            res.status(500).json("Error getting shipmentDates data!")
        }
        else if (data.length === 0) {
            res.status(404).json("Table shipmentDates has no data!");
        }
        else {
            res.status(200).json(data);
        }
    });
});

shipmentDatesRouter.post("", (req, res) => {

    db.query("INSERT INTO shipmentdates VALUES (?, ?, ?, ?);", [req.body.routeNo, req.body.departureDate, req.body.shipID, req.body.estArrivalDate], (err) => {
        if (err != null) {
            res.status(500).json("Error inserting into shipmentDates!");
        }
        else {
            res.status(200).json("Succesfully inserted into shipmentDates!");
        }
    })
});

shipmentDatesRouter.put("", (req, res) => {

    db.query("UPDATE shipmentdates SET shipID=IFNULL(?,shipID) estArrivalDate=IFNULL(?,estArrivalDate) WHERE routeNo=? AND departureDate=? AND shipID=?;", [req.body.estArrivalDate, req.body.routeNo, req.body.departureDate, req.body.shipID], (err) => {
        if (err != null) {
            res.status(500).json("Error updating row with routeNo: " + req.body.routeNo + " and departureDate: " + req.body.departureDate + " and shipID: " + req.body.shipID + " in shipmentDates!");
        }
        else {
            res.status(200).json("Succesfully updated row with routeNo: " + req.body.routeNo + " and departureDate: " + req.body.departureDate + " and shipID: " + req.body.shipID + " in shipmentDates!");
        }
    })
});

shipmentDatesRouter.delete("", (req, res) => {
    db.query("DELETE FROM shipmentdates WHERE routeNo=? AND departureDate=? AND shipID=?;", [req.body.routeNo, req.body.departureDate, req.body.shipID], (err) => {
        if (err != null) {
            res.status(500).json("Error deleting row with routeNo: " + req.body.routeNo + " and departureDate: " + req.body.departureDate + " and shipID: " + req.body.shipID + " in shipmentDates!");
        }
        else {
            res.status(200).json("Succesfully deleted row with routeNo: " + req.body.routeNo + " and departureDate: " + req.body.departureDate + " and shipID: " + req.body.shipID + " in shipmentDates!");
        }
    })
});

shipmentDatesRouter.get("/primaryKey", (req, res) => {
    db.query("SELECT * FROM shipmentdates WHERE routeNo LIKE ? AND departureDate LIKE ? AND shipID LIKE ?;", ["%" + req.query.routeNe + "%", "%" + req.query.departureDate + "%", "%" + req.query.shipID + "%"], (err, data) => {
        if (err != null) {
            res.status(500).json("Error getting shipmentDates data where route number is " + req.query.routeNo + " and departure date is " + req.query.departureDate + " and ship id is " + req.query.shipID + "!");
        }
        else if (data.length === 0) {
            res.status(404).json("No shipmentDates data found for route number " + req.query.routeNo + " and departure date " + req.query.departureDate + " and ship id " + req.query.shipID + "!")
        }
        else {
            res.status(200).json(data);
        }
    });
});
module.exports = shipmentDatesRouter;