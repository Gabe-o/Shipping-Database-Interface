const express = require('express');
const db = require('../DBConnect.js');

const routesRouter = express.Router();

routesRouter.get("", (req, res) => {
    db.query("SELECT * FROM routes", (err, data) => {
        if (err != null) {
            res.status(500).json("Error getting routes data!")
        }
        else if (data.length === 0) {
            res.status(404).json("Table routes has no data!");
        }
        else {
            res.status(200).json(data);
        }
    });
});

routesRouter.post("", (req, res) => {

    db.query("INSERT INTO routes VALUES (?, ?, ?);", [req.body.startingPortNo, req.body.endingPortNo, req.body.distance], (err) => {
        if (err != null) {
            res.status(500).json("Error inserting into routes!");
        }
        else {
            res.status(200).json("Succesfully inserted into routes!");
        }
    })
});

routesRouter.put("", (req, res) => {

    db.query("UPDATE routes SET distance=(?,distance) WHERE routeNo=?;", [req.body.distance, req.body.routeNo], (err) => {
        if (err != null) {
            res.status(500).json("Error updating row with routeNo: " + req.body.routeNo + " in routes!");
        }
        else {
            res.status(200).json("Succesfully updated row with routeNo: " + req.body.routeNo + " in routes!");
        }
    })
});

routesRouter.delete("", (req, res) => {
    db.query("DELETE FROM routes WHERE routeNo=?;", [req.body.routeNo], (err) => {
        if (err != null) {
            res.status(500).json("Error deleting row with routeNo: " + req.body.routeNo + " in routes!");
        }
        else {
            res.status(200).json("Succesfully deleted row with routeNo: " + req.body.routeNo + " in routes!");
        }
    })
});

routesRouter.get("/primaryKey", (req, res) => {
    db.query("SELECT * FROM routes WHERE routeNo LIKE ?;", ["%" + req.query.routeNo + "%"], (err, data) => {
        if (err != null) {
            res.status(500).json("Error getting routes data where route number is " + req.query.routeNo + "!");
        }
        else if (data.length === 0) {
            res.status(404).json("No routes data found for route number is " + req.query.routeNo + "!")
        }
        else {
            res.status(200).json(data);
        }
    });
});

module.exports = routesRouter;