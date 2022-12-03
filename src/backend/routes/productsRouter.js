const express = require('express');
const db = require('../DBConnect.js');

const productsRouter = express.Router();

productsRouter.get("", (req, res) => {
    db.query("SELECT * FROM products", (err, data) => {
        if(err != null){
            res.status(500).json("Error getting products data!")
        }
        else if(data.length === 0){
            res.json("Table products has no data!");
        }
        else{
            res.json(data);
        }
    });
});

productsRouter.post("", (req, res) => {

    db.query("INSERT INTO products VALUES (?, ?, ?, ?);", [req.body.productName, req.body.price, req.body.weight, req.body.email], (err) => {
        if(err != null){
            res.status(500).json("Error inserting into products!");
        }
        else{
            res.status(200).json("Succesfully inserted into products!");
        }
    })
});

productsRouter.put("", (req, res) => {

    db.query("UPDATE products SET productName=(?,productName), price=(?,price), weight=(?,weight), WHERE productID=?;", [req.body.productName, erq.body.price, req.body.weight, req.body.productID], (err) => {
        if(err != null){
            res.status(500).json("Error updating row with productID: " + req.body.productID + " in products!");
        }
        else{
            res.status(200).json("Succesfully updated row with productID: " + req.body.productID + " in products!");
        }
    })
});

productsRouter.delete("", (req, res) => {
    db.query("DELETE FROM products WHERE productID=?;", [req.body.productID], (err) => {
        if(err != null){
            res.status(500).json("Error deleting row with productID: " + req.body.productID + " in products!");
        }
        else{
            res.status(200).json("Succesfully deleted row with productID: " + req.body.productID + " in products!");
        }
    })
});

module.exports = productsRouter;