const express = require('express');
const db = require('../DBConnect.js');

const productDetailsRouter = express.Router();

productDetailsRouter.get("", (req, res) => {
    db.query("SELECT * FROM productDetails", (err, data) => {
        if (err != null) {
            res.status(500).json("Error getting productDetails data!")
        }
        else if (data.length === 0) {
            res.status(404).json("Table productDetails has no data!");
        }
        else {
            res.status(200).json(data);
        }
    });
});

productDetailsRouter.post("", (req, res) => {

    db.query("INSERT INTO productDetails VALUES (?, ?, ?);", [req.body.shipmentNo, req.body.productID, req.body.quantity], (err) => {
        if (err != null) {
            res.status(500).json("Error inserting into productDetails!");
        }
        else {
            res.status(200).json("Succesfully inserted into productDetails!");
        }
    })
});

productDetailsRouter.put("", (req, res) => {

    db.query("UPDATE productDetails quantity=ISNULL(?,quantity) WHERE shipmentNo=? AND productID=?;", [req.body.quantity, req.body.shipmentNo, req.body.shipmentNo], (err) => {
        if (err != null) {
            res.status(500).json("Error updating row with shipmentNo: " + req.body.shipmentNo + " and productID: " + req.body.productID + " in productDetails!");
        }
        else {
            res.status(200).json("Succesfully updated row with shipmentNo: " + req.body.shipmentNo + " and productID: " + req.body.productID + " in productDetails!");
        }
    });
});

productDetailsRouter.delete("", (req, res) => {
    db.query("DELETE FROM productDetails WHERE shipmentNo=? AND productID=?;", [req.body.shipmentNo, req.body.productID], (err) => {
        if (err != null) {
            res.status(500).json("Error deleting row with shipmentNo: " + req.body.shipmentNo + " and productID: " + req.body.productID + " in productDetails!");
        }
        else {
            res.status(200).json("Succesfully deleted row with shipmentNo: " + req.body.shipmentNo + " and productID: " + req.body.productID + " in productDetails!");
        }
    });
});

productDetailsRouter.get("/primaryKey", (req, res) => {
    db.query("SELECT * FROM productDetails WHERE shipmentNo LIKE ? AND productID LIKE ?;", ["%" + req.query.shipmentNo + "%", "%" + req.query.productID + "%"], (err, data) => {
        if (err != null) {
            res.status(500).json("Error getting productDetails data where shipment number is " + req.query.shipmentNo + " and product id is " + req.query.productID + "!");
        }
        else if (data.length === 0) {
            res.status(404).json("No productDetails data found for shipment number " + req.query.shipmentNo + " and product id" + req.query.productID + "!")
        }
        else {
            res.status(200).json(data);
        }
    });
});

module.exports = productDetailsRouter;