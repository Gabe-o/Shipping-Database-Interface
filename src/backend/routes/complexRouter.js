const express = require('express');
const db = require('../DBConnect.js');

const complexRouter = express.Router();

complexRouter.get("/routeDetails", (req, res) => {

    db.query(
        `SELECT
        routeDetails.routeNo,
        routeDetails.startingPortNo,
        routeDetails.endingPortNo,
        routeDetails.distance,
        routeDetails.numShipments,
        routeDetails.currentWeight,
        IFNULL(SUM(ships.maxCargoWeight),0) AS cargoCapacity,
        COUNT(ships.shipID) AS numShips
        FROM ships
        RIGHT JOIN
        (SELECT 
        routes.routeNo,
        routes.startingPortNo,
        routes.endingPortNo,
        routes.distance,
        ROUND(SUM(quantity*weight),2) AS currentWeight,
        COUNT(shipments.shipmentNo) AS numShipments 
        FROM shipments
        INNER JOIN productdetails
        ON shipments.shipmentNo=productdetails.shipmentNo
        INNER JOIN products
        ON productdetails.productID=products.productID
        INNER JOIN routes
        ON shipments.routeNo=routes.routeNo 
        GROUP BY routes.routeNo
        ORDER BY routeNo ASC) 
        AS routeDetails
        ON routeDetails.routeNo=ships.routeNo
        GROUP BY routeNo;`,
        (err, data) => {
            if (err) {
                res.status(500).json("Error getting route details data!");
            }
            else if (data.length === 0) {
                res.status(404).json("Route details has no data!");
            }
            else {
                res.status(200).json(data);
            }
        });
});

complexRouter.get("/shipsOnRoute/:routeNo", (req, res) => {

    db.query(`SELECT * FROM ships WHERE routeNo=?;`, [req.params.routeNo], (err, data) => {
        if (err) {
            res.status(500).json(`Error getting ships on route ${req.params.routeNo} data!`);
        }
        else if (data.length === 0) {
            res.status(404).json(`Ships on route ${req.params.routeNo} has no data!`);
        }
        else {
            res.status(200).json(data);
        }
    });
});

complexRouter.get("/shipsCanDoRoute/:routeNo", (req, res) => {

    db.query(`SELECT * FROM ships WHERE maxRange >= (SELECT distance FROM routes WHERE routeNo=1) AND routeNo IS NULL;`, [req.params.routeNo], (err, data) => {
        if (err) {
            res.status(500).json(`Error getting ships that can do route ${req.params.routeNo} data!`);
        }
        else if (data.length === 0) {
            res.status(404).json(`Ships that can do route ${req.params.routeNo} has no data!`);
        }
        else {
            res.status(200).json(data);
        }
    });
});

complexRouter.get("/invoice", (req, res) => {

    db.query("SELECT shipmentProducts.shipmentNo, shipmentProducts.shipmentFee, shipmentProducts.productID, products.productName, products.weight, shipmentProducts.quantity, shipmentProducts.email, shipmentProducts.routeNo FROM (SELECT shipments.shipmentNo, productDetails.productID, shipments.shipmentFee, productDetails.quantity, shipments.email, shipments.routeNo FROM shipments JOIN productdetails ON shipments.shipmentNo = productdetails.shipmentNo WHERE email=?) AS shipmentProducts JOIN products ON shipmentProducts.productID=products.productID;", [req.query.email], (err, data) => {

        if (err != null) {
            res.status(500).json("Error generating invoice!")
        }
        else {
            res.status(200).json(data);
        }

    })
});

complexRouter.get("/mostCommonStartingPort", (req, res) => {

    db.query("SELECT portRoutes.portNo FROM (SELECT usedStartingPorts.portNo, usedStartingPorts.country, usedStartingPorts.portName, usedStartingPorts.region, usedStartingPorts.routeNo, shipments.shipmentNo FROM (SELECT ports.portNo, ports.region, ports.portName, ports.country, routes.routeNo FROM ports JOIN routes ON ports.portNo = routes.startingPortNo WHERE ports.country=?) AS usedStartingPorts JOIN shipments ON usedStartingPorts.routeNo=shipments.routeNo) AS portRoutes GROUP BY portRoutes.portNo ORDER BY COUNT(*) DESC LIMIT 1;", [req.query.country], (err, data) => {

        if (err != null) {
            res.status(500).json("Error getting most popular starting port in " + req.query.country);
        }
        else {
            console.log(data);
            db.query("SELECT * FROM ports WHERE portNo=?;", [data[0].portNo], (err2, data2) => {
                if (err2 != null) {
                    res.status(500).json("Error getting most popular starting port in " + req.query.country);
                }
                else {
                    res.status(200).json(data2);
                }
            });
        }
    });
});

complexRouter.get("/mostCommonEndingPort", (req, res) => {

    db.query("SELECT portRoutes.portNo FROM(SELECT usedEndingPorts.portNo, usedEndingPorts.country, usedEndingPorts.portName, usedEndingPorts.region, usedEndingPorts.routeNo, shipments.shipmentNo FROM(SELECT ports.portNo, ports.region, ports.portName, ports.country, routes.routeNo FROM ports JOIN routes ON ports.portNo = routes.endingPortNo WHERE ports.country=?) AS usedEndingPorts JOIN shipments ON usedEndingPorts.routeNo = shipments.routeNo) AS portRoutes GROUP BY portRoutes.portNo ORDER BY COUNT(*) DESC LIMIT 1;", [req.query.country], (err, data) => {

        if (err != null) {
            res.status(500).json("Error getting most popular ending port in " + req.query.country);
        }
        else {
            console.log(data);
            db.query("SELECT * FROM ports WHERE portNo=?;", [data[0].portNo], (err2, data2) => {
                if (err2 != null) {
                    res.status(500).json("Error getting most popular ending port in " + req.query.country);
                }
                else {
                    res.status(200).json(data2);
                }
            });
        }
    });
});

module.exports = complexRouter;