const express = require('express');
const db = require('../DBConnect.js');

const productsRouter = express.Router();

productsRouter.get("", (req, res) => {
    db.query("SELECT * FROM products", (err, data) => {
        if (err != null) {
            console.log(err);
            res.status(500).json("Error getting products data!")
        }
        else if (data.length === 0) {
            res.status(404).json("Table products has no data!");
        }
        else {
            res.status(200).json(data);
        }
    });
});

productsRouter.post("", (req, res) => {

    db.query("INSERT INTO products (productName, price, weight, email) VALUES (?, ?, ?, ?);", [req.body.productName, req.body.price, req.body.weight, req.body.email], (err) => {
        if (err != null) {
            console.log(err);
            res.status(500).json("Error inserting into products!");
        }
        else {
            res.status(200).json("Succesfully inserted into products!");
        }
    })
});

productsRouter.put("", (req, res) => {

    db.query("UPDATE products SET productName=IFNULL(?,productName), price=IFNULL(?,price), weight=IFNULL(?,weight) WHERE productID=?;", [req.body.productName, req.body.price, req.body.weight, req.body.productID], (err) => {
        if (err != null) {
            console.log(err);
            res.status(500).json("Error updating row with productID: " + req.body.productID + " in products!");
        }
        else {
            res.status(200).json("Succesfully updated row with productID: " + req.body.productID + " in products!");
        }
    })
});

productsRouter.delete("", (req, res) => {
    db.query("DELETE FROM products WHERE productID=?;", [req.body.productID], (err) => {
        if (err != null) {
            console.log(err);
            res.status(500).json("Error deleting row with productID: " + req.body.productID + " in products!");
        }
        else {
            res.status(200).json("Succesfully deleted row with productID: " + req.body.productID + " in products!");
        }
    })
});

productsRouter.get("/primaryKey", (req, res) => {
    db.query("SELECT * FROM products WHERE productID LIKE ?;", ["%" + req.query.productID + "%"], (err, data) => {
        if (err != null) {
            res.status(500).json("Error getting products data where product id is " + req.query.productID + "!");
        }
        else if (data.length === 0) {
            res.status(404).json("No products data found for product id " + req.query.productID + "!")
        }
        else {
            res.status(200).json(data);
        }
    });
});

productsRouter.get("/email", (req, res) => {
    db.query("SELECT * FROM products WHERE email LIKE ?;", [req.query.email], (err, data) => {
        if (err != null) {
            res.status(500).json("Error getting products data where email is " + req.query.email + "!");
        }
        else if (data.length === 0) {
            res.status(404).json("No products data found for email " + req.query.email + "!")
        }
        else {
            res.status(200).json(data);
        }
    });
});

module.exports = productsRouter;