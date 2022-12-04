import React from "react";

function Ship(ship) {

    return (
        <React.Fragment>
            <tr>
                <td>{ship.shipID}</td>
                <td>{ship.shipName}</td>
                <td>{ship.maxCargoWeight}</td>
                <td>{ship.captain}</td>
                <td>{ship.routeNo}</td>
                <td>{ship.homePortNo}</td>
                <td>{ship.maxRange}</td>
                <td>{ship.speed}</td>
                <td><button>Update</button><button>Delete</button></td>
            </tr>
        </React.Fragment>
    )
}

export default Ship;