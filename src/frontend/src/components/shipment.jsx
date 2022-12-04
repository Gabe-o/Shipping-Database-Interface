import React from "react";

function Shipment(shipment) {

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
                <td><button>Update</button><button>Delete</button></td>
            </tr>
        </React.Fragment>
    )
}

export default Shipment;