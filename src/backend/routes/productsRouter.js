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

module.exports = productsRouter;