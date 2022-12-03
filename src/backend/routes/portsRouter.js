const express = require('express');
const db = require('../DBConnect.js');

const portsRouter = express.Router();

portsRouter.get("", (req, res) => {
    db.query("SELECT * FROM ports", (err, data) => {
        if(err != null){
            res.status(500).json("Error getting ports data!")
        }
        else if(data.length === 0){
            res.status(404).json("Table ports has no data!");
        }
        else{
            res.status(200).json(data);
        }
    });
});

portsRouter.post("", (req, res) => {

    db.query("INSERT INTO ports VALUES (?, ?, ?, ?, ?, ?);", [req.body.portNo, req.body.region, req.body.portName, req.body.country, req.body.latitude, req.body.longitude], (err) => {
        if(err != null){
            res.status(500).json("Error inserting into ports!");
        }
        else{
            res.status(200).json("Succesfully inserted into ports!");
        }
    })
});

portsRouter.put("", (req, res) => {

    db.query("UPDATE ports SET region=ISNULL(?,region), portName=ISNULL(?,portName), country=ISNULL(?,country), latitude=ISNULL(?,latitude), longitude=ISNULL(?,longitude) WHERE portNo=?", [req.body.region, req.body.portName, req.body.country, req.body.latitude, req.body.longitude, req.body.portNo], (err) => {
        if(err != null){
            res.status(500).json("Error updating row with portNo: " + req.body.portNo + " in ports!");
        }
        else{
            res.status(200).json("Succesfully updated row with portNo: " + req.body.portNo + " in ports!");
        }
    });
});

portsRouter.delete("", (req, res) => {
    db.query("DELETE FROM ports WHERE portNo=?", [req.body.portNo], (err) => {
        if(err != null){
            res.status(500).json("Error deleting row with portNo: " + req.body.portNo + " in ports!");
        }
        else{
            res.status(200).json("Succesfully deleted row with portNo: " + req.body.portNo + " in ports!");
        }
    });
});

portsRouter.get("/primaryKey", (req, res) => {
    db.query("SELECT * FROM ports WHERE portNo=?;", [req.params.portNo], (err, data) => {
        if(err != null){
            res.status(500).json("Error getting ports data where port number is " + req.params.portNo + "!");
        }
        else if(data.length === 0){
            res.status(404).json("No ports data found for port number " + req.params.portNo + "!")
        }
        else{
            res.status(200).json(data);
        }
    });
});

module.exports = portsRouter;