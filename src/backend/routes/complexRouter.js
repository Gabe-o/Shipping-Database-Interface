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
        ON (shipments.shipmentNo=productdetails.shipmentNo AND shipments.status!='Delivered')
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

// Add a ship to a route
complexRouter.post("/addShipToRoute/:routeNo", (req, res) => {
    // Check the routeNo of the ship
    db.query(`SELECT routeNo FROM ships WHERE shipID=?;`, [req.body.shipID], (err, data) => {
        if (err) {
            res.status(500).json(`Error getting ship with ID ${req.body.shipID} data!`);
        }
        else if (data.length === 0) {
            res.status(404).json(`Ships with ID ${req.body.shipID} has no data!`);
        }
        // If the ships is already assigned to that route
        else if (data[0].routeNo === parseInt(req.params.routeNo)) {
            res.json(`Ship ${req.body.shipID} is already assigned to route ${routeNo}`);
        }
        // If the ship is assigned to no route
        else if (!data[0].routeNo) {
            db.query(`UPDATE ships SET routeNo=? WHERE shipID=?`, [req.params.routeNo, req.body.shipID], (err, data) => {
                if (err) {
                    res.status(500).json(`Error setting ship with ID ${req.body.shipID} to route ${req.params.routeNo}!`);
                }
                else {
                    res.json(`Successfully added ship ${req.body.shipID} to route ${req.params.routeNo}!`)
                }
            });
        }
        // If the ship is assigned to a route already
        else {
            res.status(400).json(`Ship ${req.body.shipID} is already assigned to route ${data[0].routeNo}`);
        }
    });
});

// Remove a ship from a route
complexRouter.post("/removeShipFromRoute/:routeNo", (req, res) => {
    db.query(`SELECT shipmentNo FROM shipments WHERE status != 'Delivered' AND shipID=?;`, [req.body.shipID], (err, data) => {
        if (err) {
            res.status(500).json(`Error getting ship with ID ${req.body.shipID} data!`);
        }
        else if (data.length !== 0) {
            let shipmentNo = data.map(ship => ship.shipmentNo).toString();
            res.status(400).json(`Couldn't remove Ship ${req.body.shipID} becuase it is assigned to shipmentNo: ${data.map(ship => ship.shipmentNo).toString()}`);
        }
        else {
            db.query(`UPDATE ships SET routeNo=null WHERE shipID=?`, [req.body.shipID], (err) => {
                if (err) {
                    res.status(500).json(`Error getting ship with ID ${req.body.shipID} data!`);
                }
                else {
                    res.json(`Successfully added ship ${req.body.shipID} to route ${req.params.routeNo}!`)
                }
            });
        }
    });


});

complexRouter.get("/shipWeight", (req, res) => {

    db.query("SELECT ROUND(SUM(quantity*weight),2) AS shipmentWeight FROM products INNER JOIN productdetails ON products.productID = productdetails.productID WHERE productdetails.shipmentNo = ?;" , [req.query.shipmentNo], (err, data) => {
       if(err){
        console.log(err)
       }
       else{
        res.status(200).json(data[0].shipmentWeight);
        
       }
    });
})

module.exports = complexRouter;