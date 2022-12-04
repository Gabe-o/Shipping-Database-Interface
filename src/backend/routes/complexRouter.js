const express = require('express');
const db = require('../DBConnect.js');

const complexRouter = express.Router();

complexRouter.get("routeDetails", (req, res) => {

    db.query(
        `SELECT 
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
        ORDER BY routeNo ASC;`,
        (err, data) => {
            if (err != null) {
                res.status(500).json("Error getting route details data!")
            }
            else if (data.length === 0) {
                res.status(404).json("route details has no data!");
            }
            else {
                res.status(200).json(data);
            }
        });
});

module.exports = complexRouter;