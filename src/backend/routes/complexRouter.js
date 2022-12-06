const express = require('express');
const db = require('../DBConnect.js');
const moment = require('moment');
moment().format('YYYY-MM-DD HH:mm:ss');

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
    })
}
)

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

    db.query("SELECT ROUND(SUM(quantity*weight),2) AS shipmentWeight FROM products INNER JOIN productdetails ON products.productID = productdetails.productID WHERE productdetails.shipmentNo = ?;", [req.query.shipmentNo], (err, data) => {
        if (err) {

            res.status(500).json(err);

        }
        else {
            res.status(200).json(data[0].shipmentWeight);

        }

    });
});

complexRouter.post("/shipment", (req, res) => {

    db.query("INSERT INTO shipments (routeNo, shipmentFee, status, email) VALUES (?, ?, ?, ?);", [req.body.routeNo, "0", "Pending", req.body.email], async (err, data) => {
        if (err != null) {

            res.status(500).json("Error creating shipment!");
        }
        else {
            for (let c = 0; c < Object.keys(req.body.products).length; c++) {

                if (Object.values(req.body.products)[c] > 0) {
                    db.query("INSERT INTO productdetails VALUES (?,?,?);", [data.insertId, Object.keys(req.body.products)[c], Object.values(req.body.products)[c]], (err) => {
                        if (err != null) {
                            res.status(500).json("Error creating shipment");
                            return;
                        }
                    });
                }
            }

            db.query("UPDATE shipments SET shipmentFee = (SELECT ROUND(SUM(quantity * weight) * 0.05, 2) AS shipmentFee FROM products INNER JOIN productdetails ON products.productID = productdetails.productID WHERE productdetails.shipmentNo = ?) WHERE shipments.shipmentNo = ?; ", [data.insertId, data.insertId], (err) => {
                if (err != null) {
                    res.status(500).json("Error creating shipment!");
                }
                else {
                    res.status(200).json("Succesfully created shipment!");
                }
            });
        }
    });
});

function calculateArrivalDate(distance, departureDate, speed) {
    departureDate = moment(departureDate);
    let travelTime = parseFloat(distance) / parseFloat(speed)
    return departureDate.add(travelTime, 'h').format();
}

function calculateDistance(startLat, startLon, endLat, endLon) {
    const latitude = (startLat - endLat) * 110.574;
    const longitude = Math.abs(parseFloat(startLon) - parseFloat(endLon)) * (111.320 * Math.cos(latitude));
    const totalDistance = Math.round(Math.sqrt(Math.pow(latitude, 2) + Math.pow(longitude, 2)));
    return totalDistance;
}

complexRouter.post("/shipmentToShip", (req, res) => {

    // Adding ship to a route
    db.query("UPDATE shipments SET shipID=? WHERE shipmentNo=?", [req.body.shipID, req.body.shipmentNo], (err, data) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            // Updating departure date based on assigned ship
            // Getting all required data
            db.query(`SELECT c.shipmentNo,c.routeNo,c.startingPortNo,c.startLat,c.startLon,c.endingPortNo,c.endLat,c.endLon,c.shipID,c.homePortNo,ports.latitude AS homeLat,ports.longitude AS homeLon,c.speed FROM
                (SELECT b.shipmentNo,b.routeNo,b.startingPortNo,b.startLat,b.startLon,b.endingPortNo,ports.latitude AS endLat,ports.longitude AS endLon,b.shipID,b.homePortNo,b.speed FROM
                (SELECT a.shipmentNo,a.routeNo,a.startingPortNo,ports.latitude AS startLat,ports.longitude AS startLon,a.endingPortNo,a.shipID,a.homePortNo,a.speed FROM
                (SELECT shipments.shipmentNo,shipments.routeNo,routes.startingPortNo,routes.endingPortNo,ships.shipID,ships.homePortNo,ships.speed 
                FROM shipments
                JOIN routes ON routes.routeNo=shipments.routeNo
                JOIN ships ON ships.shipID=shipments.shipID
                WHERE ships.shipID=? AND shipments.shipmentNo=?) AS a
                JOIN ports ON a.startingPortNo=ports.portNo) AS b
                JOIN ports ON b.endingPortNo=ports.portNo) AS c
                JOIN ports ON c.homePortNo=ports.portNo;`, [req.body.shipID, req.body.shipmentNo],
                (err, data) => {
                    if (err) {
                        res.status(500).json(err);
                    }
                    // Calculating dates and distances
                    let distToStart = calculateDistance(data[0].homeLat, data[0].homeLon, data[0].startLat, data[0].startLon);
                    let departureDate = calculateArrivalDate(distToStart, moment().format(), data[0].speed);
                    let routeDist = calculateDistance(data[0].startLat, data[0].startLon, data[0].endLat, data[0].endLon);
                    let estArrivalDate = calculateArrivalDate(routeDist, departureDate, data[0].speed);

                    // Updating shipments
                    db.query(`UPDATE shipments SET departureDate=? WHERE shipmentNo=?`, [departureDate, req.body.shipmentNo], (err) => {
                        if (err) {
                            res.status(500).json(err);
                        }
                        else {
                            // Adding Shipment date
                            db.query(`INSERT INTO shipmentdates VALUES (?,?,?,?);`, [data[0].routeNo, departureDate, req.body.shipID, estArrivalDate], (err) => {
                                if (err) {
                                    res.status(500).json(err);
                                }
                                else {
                                    res.status(200);
                                }
                            });
                        }
                    });
                });
        }

    });
})

complexRouter.post("/shipmentToShipDelete", (req, res) => {
    db.query(`SELECT * FROM shipments WHERE shipmentNo=?`, [req.body.shipmentNo], (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            db.query("UPDATE shipments SET departureDate=NULL, shipID=NULL WHERE shipmentNo=?", [req.body.shipmentNo], (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    db.query(`DELETE FROM shipmentdates WHERE routeNo=? AND departureDate=? AND shipID=?`, [data[0].routeNo, data[0].departureDate, data[0].shipID], (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            res.status(200);
                        }
                    });
                }
            });
        }
    });
})



module.exports = complexRouter;