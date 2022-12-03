const express = require('express');
const db = require('../DBConnect.js');

const shipmentDatesRouter = express.Router();

shipmentDatesRouter.get("", (req, res) => {
    db.query("SELECT * FROM shipmentDates", (err, data) => {
        if(err != null){
            res.status(500).json("Error getting shipmentDates data!")
        }
        else if(data.length === 0){
            res.json("Table shipmentDates has no data!");
        }
        else{
            res.json(data);
        }
    });
});

shipmentDatesRouter.post("", (req, res) => {

    db.query("INSERT INTO shipmentDates VALUES (?, ?, ?, ?);", [req.body.routeNo, req.body.departureDate, req.body.shipID, req.body.estArrivalDate], (err) => {
        if(err != null){
            res.status(500).json("Error inserting into shipmentDates!");
        }
        else{
            res.status(200).json("Succesfully inserted into shipmentDates!");
        }
    })
});

shipmentDatesRouter.put("", (req, res) => {

    db.query("UPDATE shipmentDates SET shipID=ISNULL(?,shipID) estArrivalDate=ISNULL(?,estArrivalDate) WHERE routeNo=? AND departureDate=? AND shipID=?;", [req.body.estArrivalDate, req.body.routeNo, req.body.departureDate, req.body.shipID], (err) => {
        if(err != null){
            res.status(500).json("Error updating row with routeNo: " + req.body.routeNo + " and departureDate: " + req.body.departureDate + " and shipID: " + req.body.shipID + " in shipmentDates!");
        }
        else{
            res.status(200).json("Succesfully updated row with routeNo: " + req.body.routeNo + " and departureDate: " + req.body.departureDate + " and shipID: " + req.body.shipID + " in shipmentDates!");
        }
    })
});

shipmentDatesRouter.delete("", (req, res) => {
    db.query("DELETE FROM shipmentDATES WHERE routeNo=? AND departureDate=? AND shipID=?;", [req.body.routeNo, req.body.departureDate, req.body.shipID], (err) => {
        if(err != null){
            res.status(500).json("Error deleting row with routeNo: " + req.body.routeNo + " and departureDate: " + req.body.departureDate + " and shipID: " + req.body.shipID + " in shipmentDates!");
        }
        else{
            res.status(200).json("Succesfully deleted row with routeNo: " + req.body.routeNo + " and departureDate: " + req.body.departureDate + " and shipID: " + req.body.shipID + " in shipmentDates!");
        }
    })
});

module.exports = shipmentDatesRouter;