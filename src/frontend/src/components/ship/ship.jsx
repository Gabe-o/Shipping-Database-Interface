import React from "react";
import { useState } from "react";
import ShipDeletePopup from "./shipDeletePopup";
import ShipUpdatePopup from "./shipUpdatePopup";

function Ship(ship) {

    const [remove, setRemoveState] = useState(false);
    const [update, setUpdateState] = useState(false);

    const updateButton = () => {
        setUpdateState(!update);
    }

    const deleteButton = () => {
        setRemoveState(!remove);
    }

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
                <td><button onClick={updateButton}>Update</button><button onClick={deleteButton}>Delete</button></td>
            </tr>
            {update ? <ShipUpdatePopup buttonState={setUpdateState} ship={ship} /> : null}
            {remove ? <ShipDeletePopup buttonState={setRemoveState} ship={ship} /> : null}
        </React.Fragment>
    )
}

export default Ship;