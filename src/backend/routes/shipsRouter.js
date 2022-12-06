const express = require('express');
const db = require('../DBConnect.js');

const shipsRouter = express.Router();

shipsRouter.get("", (req, res) => {
    db.query("SELECT * FROM ships", (err, data) => {
        if (err != null) {
            res.status(500).json("Error getting ships data!")
        }
        else if (data.length === 0) {
            res.status(404).json("Table ships has no data!");
        }
        else {
            res.status(200).json(data);
        }
    });
});

shipsRouter.post("", (req, res) => {

    db.query("INSERT INTO ships (shipname, maxCargoWeight, captain, routeNo, homePortNo, maxRange, speed) VALUES (?, ?, ?, ?, ?, ?, ?);", [req.body.shipName, req.body.maxCargoWeight, req.body.captain, req.body.routeNo, req.body.homePortNo, req.body.maxRange, req.body.speed], (err) => {
        if (err != null) {
            console.log(err);
            res.status(500).json("Error inserting into ships!");
        }
        else {
            res.status(200).json("Succesfully inserted into ships!");
        }
    })
});

shipsRouter.put("", (req, res) => {

    db.query("UPDATE ships SET shipname=IFNULL(?,shipname), maxCargoWeight=IFNULL(?,maxCargoWeight), captain=IFNULL(?,captain), homePortNo=IFNULL(?,homePortNo), maxRange=IFNULL(?,maxRange), speed=IFNULL(?,speed) WHERE shipID=?;", [req.body.shipName, req.body.maxCargoWeight, req.body.captain, req.body.homePortNo, req.body.maxRange, req.body.speed, req.body.shipID], (err) => {
        if (err != null) {
            res.status(500).json("Error updating row with " + req.body.shipID + " in ships!");
        }
        else {
            res.status(200).json("Succesfully updated row with " + req.body.shipID + " in ships!");
        }
    })
});

shipsRouter.delete("", (req, res) => {
    db.query("DELETE FROM ships WHERE shipID=?;", [req.body.shipID], (err) => {
        if (err != null) {
            res.status(500).json("Error deleting row with " + req.body.shipID + " in ships!");
        }
        else {
            res.status(200).json("Succesfully deleted row with " + req.body.shipID + " in ships!");
        }
    })
});

shipsRouter.get("/primaryKey", (req, res) => {
    db.query("SELECT * FROM ships WHERE shipID LIKE ?;", ["%" + req.query.shipID + "%"], (err, data) => {
        if (err != null) {
            res.status(500).json("Error getting ships data where ship id is " + req.query.shipID + "!");
        }
        else if (data.length === 0) {
            res.status(404).json("No ships data found for ship id " + req.query.shipID + "!")
        }
        else {
            res.status(200).json(data);
        }
    });
});

shipsRouter.get("/shipMaxWeight", (req, res) => {
    db.query("SELECT maxCargoWeight, shipID FROM ships;", (err, data) => {
        if(err){
            console.log(err)
        }
        else{
            res.status(200).json(data);
        }
    })
})

module.exports = shipsRouter;