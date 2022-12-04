import React from "react";
import { useState } from "react";
import ShipmenttDeletePopup from "./shipmentDeletePopup";
import ShipmentUpdatePopup from "./shipmentUpdatePopup";

function Shipment(shipment) {

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
                <td>{shipment.shipmentNo}</td>
                <td>{shipment.routeNo}</td>
                <td>{shipment.shipmentFee}</td>
                <td>{shipment.status}</td>
                <td>{shipment.departureDate}</td>
                <td>{shipment.shipID}</td>
                <td>{shipment.email}</td>
                <td><button onClick={updateButton}>Update</button><button onClick={deleteButton}>Delete</button></td>
            </tr>
            {update ? <ShipmentUpdatePopup buttonState={setUpdateState} shipment={shipment} /> : null}
            {remove ? <ShipmenttDeletePopup buttonState={setRemoveState} shipment={shipment} /> : null}
        </React.Fragment>
    )
}

export default Shipment;