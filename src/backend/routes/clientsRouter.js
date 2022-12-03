const express = require('express');
const db = require('../DBConnect.js');

const clientsRouter = express.Router();

clientsRouter.get("", (req, res) => {

    db.query("SELECT * FROM clients", (err, data) => {
        if(err != null){
            res.status(500).json("Error getting clients data!")
        }
        else if(data.length === 0){
            res.json("Table clients has no data!");
        }
        else{
            res.json(data);
        }
    });

});

clientsRouter.post("", (req, res) => {

    db.query("INSERT INTO clients VALUES (?, ?, ?);", [req.body.email, req.body.name, req.body.phoneNo], (err) => {
        if(err != null){
            res.status(500).json("Error inserting into clients!");
        }
        else{
            res.status(200).json("Succesfully inserted into clients!");
        }
    })
});

clientsRouter.put("", (req, res) => {

    db.query("UPDATE clients name=ISNULL(?,name), phoneNo=(?,phoneNo) WHERE email=?;", [req.body.name, req.body.phoneNo, req.body.email], (err) => {
        if(err != null){
            res.status(500).json("Error updating row with email: " + req.body.email + " in clients!");
        }
        else{
            res.status(200).json("Succesfully updated row with email: " + req.body.email + " in clients!");
        }
    })
});

clientsRouter.delete("", (req, res) => {
    db.query("DELETE FROM clients WHERE email=?;", [req.body.email], (err) => {
        if(err != null){
            res.status(500).json("Error deleting row with email: " + req.body.email + " in clients!");
        }
        else{
            res.status(200).json("Succesfully deleted row with email: " + req.body.email + " in clients!");
        }
    })
});

module.exports = clientsRouter;