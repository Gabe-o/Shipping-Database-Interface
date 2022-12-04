import React from "react";
import { useState } from "react";
import ShipmentDateDeletePopup from "./shipmentDateDeletePopup";
import ShipmentDateUpdatePopup from "./shipmentDateUpdatePopup";

function ShipmentDate(shipmentDate) {

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
                <td>{shipmentDate.routeNo}</td>
                <td>{shipmentDate.departureDate}</td>
                <td>{shipmentDate.shipID}</td>
                <td>{shipmentDate.estArrivalDate}</td>
                <td><button onClick={updateButton}>Update</button><button onClick={deleteButton}>Delete</button></td>
            </tr>
            {update ? <ShipmentDateUpdatePopup buttonState={setUpdateState} shipmentDate={shipmentDate} /> : null}
            {remove ? <ShipmentDateDeletePopup buttonState={setRemoveState} shipmentDate={shipmentDate} /> : null}
        </React.Fragment>
    )
}

export default ShipmentDate;