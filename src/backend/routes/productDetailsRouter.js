const express = require('express');
const db = require('../DBConnect.js');

const productDetailsRouter = express.Router();

productDetailsRouter.get("", (req, res) => {
    db.query("SELECT * FROM productDetails", (err, data) => {
        if(err != null){
            res.status(500).json("Error getting productDetails data!")
        }
        else if(data.length === 0){
            res.json("Table productDetails has no data!");
        }
        else{
            res.json(data);
        }
    });
});

productDetailsRouter.post("", (req, res) => {

    db.query("INSERT INTO productDetails VALUES (?, ?, ?);", [req.body.shipmentNo, req.body.productID, req.body.quantity], (err) => {
        if(err != null){
            res.status(500).json("Error inserting into productDetails!");
        }
        else{
            res.status(200).json("Succesfully inserted into productDetails!");
        }
    })
});

module.exports = productDetailsRouter;