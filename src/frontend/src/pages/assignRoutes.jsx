import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/assignRoutes.css';

// Component for rendering a route with extra information
function RouteDetail({ routeNo, startingPortNo, endingPortNo, distance, numShipments, currentWeight, cargoCapacity, numShips, setSelectedRoute }) {
    const selectRoute = () => {
        setSelectedRoute({
            routeNo: routeNo,
            startingPortNo: startingPortNo,
            endingPortNo: endingPortNo,
            distance: distance,
            numShipments: numShipments,
            currentWeight: currentWeight,
            cargoCapacity: cargoCapacity,
            numShips: numShips,
        });
    }

    return (
        <>
            <tr onClick={selectRoute}>
                <td>{routeNo}</td>
                <td>{startingPortNo}</td>
                <td>{endingPortNo}</td>
                <td>{distance}</td>
                <td>{numShipments}</td>
                <td>{currentWeight}</td>
                <td>{cargoCapacity}</td>
                <td>{numShips}</td>
            </tr>
        </>
    );
}

// Component for displaying a ship that is assigned to a route
function AssignedShip({ shipID, shipName, maxCargoWeight, captain, routeNo, homePortNo, maxRange, speed, setAssignedShips, setAvailableShips, assignedShips, availableShips, setSelectedRoutePending }) {

    const unassignShip = async () => {
        // Removing this ship for the list of assigned ships
        let newAssignedShips = await assignedShips.filter(ship => ship.shipID !== shipID).sort((a, b) => a.shipID - b.shipID);

        // Adding this ship to the list of available ships
        let newAvailableShips = availableShips;
        await newAvailableShips.push(assignedShips.find(ship => ship.shipID === shipID));
        await newAvailableShips.sort((a, b) => a.shipID - b.shipID);

        // Updating states
        setAssignedShips(newAssignedShips);
        setAvailableShips(newAvailableShips);
        setSelectedRoutePending((currentSelectedRoute) => {
            return ({
                ...currentSelectedRoute,
                cargoCapacity: newAssignedShips.reduce((accumulator, currentShip) => { return (accumulator + currentShip.maxCargoWeight); }, 0),
                numShips: newAssignedShips.length
            });
        });
    }

    return (
        <>
            <tr>
                <td>{shipID}</td>
                <td>{shipName}</td>
                <td>{maxCargoWeight}</td>
                <td>{captain}</td>
                <td>{homePortNo}</td>
                <td>{maxRange}</td>
                <td>{speed}</td>
                <td><button onClick={unassignShip}>{'>'}</button></td>
            </tr>
        </>
    );
}

function UnassignedShip({ shipID, shipName, maxCargoWeight, captain, routeNo, homePortNo, maxRange, speed, setAssignedShips, setAvailableShips, assignedShips, availableShips, setSelectedRoutePending }) {

    const assignShip = async () => {
        // Removing this ship for the list of available ships
        let newAvailableShips = await availableShips.filter(ship => ship.shipID !== shipID).sort((a, b) => a.shipID - b.shipID);

        // Adding this ship to the list of assigned ships
        let newAssignedShips = assignedShips;
        await newAssignedShips.push(availableShips.find(ship => ship.shipID === shipID));
        await newAssignedShips.sort((a, b) => a.shipID - b.shipID);

        // Updating states
        setAssignedShips(newAssignedShips);
        setAvailableShips(newAvailableShips);
        setSelectedRoutePending((currentSelectedRoute) => {
            return ({
                ...currentSelectedRoute,
                cargoCapacity: newAssignedShips.reduce((accumulator, currentShip) => { return (accumulator + currentShip.maxCargoWeight); }, 0),
                numShips: newAssignedShips.length
            });
        });
    }

    return (
        <>
            <tr>
                <td><button onClick={assignShip}>{'<'}</button></td>
                <td>{shipID}</td>
                <td>{shipName}</td>
                <td>{maxCargoWeight}</td>
                <td>{captain}</td>
                <td>{homePortNo}</td>
                <td>{maxRange}</td>
                <td>{speed}</td>
            </tr>
        </>
    );
}


function AssignRoutes() {

    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [assignedShips, setAssignedShips] = useState([]);
    const [availableShips, setAvailableShips] = useState([]);
    const [selectedRoutePending, setSelectedRoutePending] = useState(null); // For updating the route info during ship assignment without forcing a state change

    // Runs when a route is selected or unselected
    useEffect(() => {
        // If no route is selected get update list of routes for the database
        if (!selectedRoute) {
            fetch("/api/complex/routeDetails", {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(httpResp => {
                    return httpResp.json().then(data => {
                        if (!httpResp.ok) {
                            throw new Error(httpResp.status + "\n" + JSON.stringify(data));
                        }
                        else {
                            setRoutes(data);
                        }
                        if (httpResp.status === 404) {
                            setRoutes([]);
                        }
                    })
                })
                .catch(err => {
                    alert(err);
                });
        }
        // If a route is selected get the ships on that route and the ships that have enough range to complete the route
        else {
            // Sets this so it can be edited in real time without calling this useEffect again
            setSelectedRoutePending(selectedRoute);

            // Gets ships on the selected route
            fetch("/api/complex/shipsOnRoute/" + selectedRoute.routeNo, {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(httpResp => {
                    return httpResp.json().then(data => {
                        if (!httpResp.ok) {
                            throw new Error(httpResp.status + "\n" + JSON.stringify(data));
                        }
                        else {
                            setAssignedShips(data);
                        }
                        if (httpResp.status === 404) {
                            setAssignedShips([]);
                        }
                    })
                })
                .catch(err => {
                    alert(err);
                });

            // Gets ships that can complete the selected route
            fetch("/api/complex/shipsCanDoRoute/" + selectedRoute.routeNo, {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(httpResp => {
                    return httpResp.json().then(data => {
                        if (!httpResp.ok) {
                            throw new Error(httpResp.status + "\n" + JSON.stringify(data));
                        }
                        else {
                            setAvailableShips(data);
                        }
                        if (httpResp.status === 404) {
                            setAvailableShips([]);
                        }
                    })
                })
                .catch(err => {
                    alert(err);
                });
        }
    }, [selectedRoute]);

    // Resets page to state before route was selected
    const resetSelectedRoute = () => {
        setSelectedRoute(null);
        setSelectedRoutePending(null);
        setAssignedShips([]);
        setAvailableShips([]);
    }

    const saveShipAssignment = async () => {
        let currentlyAvailableShipIDs = []
        // Gets ships that can complete the selected route
        await fetch("/api/complex/shipsCanDoRoute/" + selectedRoute.routeNo, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(httpResp => {
                return httpResp.json().then(data => {
                    if (!httpResp.ok) {
                        throw new Error(httpResp.status + "\n" + JSON.stringify(data));
                    }
                    else {
                        currentlyAvailableShipIDs = data.map(ship => ship.shipID);
                    }
                })
            })
            .catch(err => {
                alert(err);
            });
        let newlyAvailableShipIDs = availableShips.map(ship => ship.shipID);

        // Removing ships that are already assigned
        newlyAvailableShipIDs = newlyAvailableShipIDs.filter(ship => !currentlyAvailableShipIDs.includes(ship));

        // Gets ship ids for the selected route
        let currentlyAssignedShipIDs = [];
        await fetch("/api/complex/shipsOnRoute/" + selectedRoute.routeNo, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(httpResp => {
                return httpResp.json().then(data => {
                    if (!httpResp.ok) {
                        throw new Error(httpResp.status + "\n" + JSON.stringify(data));
                    }
                    else {
                        currentlyAssignedShipIDs = data.map(ship => ship.shipID);
                    }
                })
            })
            .catch(err => {
                alert(err);
            });
        let newlyAssignedShipIDs = assignedShips.map(ship => ship.shipID);

        // Removing ships that are already assigned
        newlyAssignedShipIDs = newlyAssignedShipIDs.filter(ship => !currentlyAssignedShipIDs.includes(ship));
        // Adding ships to route
        for (let shipID of newlyAssignedShipIDs) {
            await fetch("/api/complex/addShipToRoute/" + selectedRoute.routeNo, {
                method: "POST",
                body: JSON.stringify({
                    shipID: shipID
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(httpResp => {
                    return httpResp.json().then(data => {
                        if (!httpResp.ok) {
                            throw new Error(httpResp.status + "\n" + JSON.stringify(data));
                        }

                    })
                })
                .catch(err => {
                    alert(err);
                });
        }

        // Removing ships to route
        for (let shipID of newlyAvailableShipIDs) {
            await fetch("/api/complex/removeShipFromRoute/" + selectedRoute.routeNo, {
                method: "POST",
                body: JSON.stringify({
                    shipID: shipID
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(httpResp => {
                    return httpResp.json().then(data => {
                        if (!httpResp.ok) {
                            throw new Error(httpResp.status + "\n" + JSON.stringify(data));
                        }
                    })
                })
                .catch(err => {
                    alert(err);
                });
        }

        resetSelectedRoute();
    }

    // Menu for selecting routes
    const renderRouteSelect = () => {
        return (
            <>
                <h1>Select A Route</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Route #</th>
                            <th>Start Port</th>
                            <th>End Port</th>
                            <th>Distance</th>
                            <th># of Shipments</th>
                            <th>Total Shipment Weight</th>
                            <th>Total Cargo Capacity</th>
                            <th># of Ships</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            routes.map((route, c) => {
                                return (<RouteDetail
                                    routeNo={route.routeNo}
                                    startingPortNo={route.startingPortNo}
                                    endingPortNo={route.endingPortNo}
                                    distance={route.distance}
                                    numShipments={route.numShipments}
                                    currentWeight={route.currentWeight}
                                    cargoCapacity={route.cargoCapacity}
                                    numShips={route.numShips}
                                    setSelectedRoute={setSelectedRoute}
                                    key={c} />);
                            })
                        }
                    </tbody>
                </table>
            </>
        );
    }

    // Menu for assigning ships
    const renderShipAssignment = () => {
        return (
            <>
                <button onClick={resetSelectedRoute}>BACK</button>
                <button onClick={saveShipAssignment}>SAVE</button>
                <h1>Selected Route</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Route #</th>
                            <th>Start Port</th>
                            <th>End Port</th>
                            <th>Distance</th>
                            <th># of Shipments</th>
                            <th>Total Shipment Weight</th>
                            <th>Total Cargo Capacity</th>
                            <th># of Ships</th>
                        </tr>
                    </thead>
                    <tbody>
                        <RouteDetail
                            routeNo={selectedRoutePending.routeNo}
                            startingPortNo={selectedRoutePending.startingPortNo}
                            endingPortNo={selectedRoutePending.endingPortNo}
                            distance={selectedRoutePending.distance}
                            currentWeight={selectedRoutePending.currentWeight}
                            numShipments={selectedRoutePending.numShipments}
                            cargoCapacity={selectedRoutePending.cargoCapacity}
                            numShips={selectedRoutePending.numShips} />
                    </tbody>
                </table>
                <div>
                    <div className="assignedShips">
                        <h1>Assigned Ships</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ship #</th>
                                    <th>Ship Name</th>
                                    <th>Max Cargo Weight</th>
                                    <th>Captain</th>
                                    <th>Home Port</th>
                                    <th>Max Range</th>
                                    <th>Speed</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    assignedShips.map((ship, c) => {
                                        return (
                                            < AssignedShip
                                                shipID={ship.shipID}
                                                shipName={ship.shipName}
                                                maxCargoWeight={ship.maxCargoWeight}
                                                captain={ship.captain}
                                                routeNo={ship.routeNo}
                                                homePortNo={ship.homePortNo}
                                                maxRange={ship.maxRange}
                                                speed={ship.speed}
                                                setAssignedShips={setAssignedShips}
                                                setAvailableShips={setAvailableShips}
                                                assignedShips={assignedShips}
                                                availableShips={availableShips}
                                                setSelectedRoutePending={setSelectedRoutePending}
                                                key={c} />
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="availableShips">
                        <h1>Available Ships</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Ship #</th>
                                    <th>Ship Name</th>
                                    <th>Max Cargo Weight</th>
                                    <th>Captain</th>
                                    <th>Home Port</th>
                                    <th>Max Range</th>
                                    <th>Speed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    availableShips.map((ship, c) => {
                                        return (
                                            < UnassignedShip
                                                shipID={ship.shipID}
                                                shipName={ship.shipName}
                                                maxCargoWeight={ship.maxCargoWeight}
                                                captain={ship.captain}
                                                routeNo={ship.routeNo}
                                                homePortNo={ship.homePortNo}
                                                maxRange={ship.maxRange}
                                                speed={ship.speed}
                                                setAssignedShips={setAssignedShips}
                                                setAvailableShips={setAvailableShips}
                                                assignedShips={assignedShips}
                                                availableShips={availableShips}
                                                setSelectedRoutePending={setSelectedRoutePending}
                                                key={c} />
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {
                selectedRoutePending ? renderShipAssignment() : renderRouteSelect()
            }
        </>
    );
}

export default AssignRoutes;