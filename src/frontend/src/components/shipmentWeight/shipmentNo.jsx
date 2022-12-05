import React from "react";
import { useState } from "react";


function ShipmentNo({shipmentNo, routeNo, shipID, weight, setShipmentNumber, setRouteNo}) {



    function setShipmentNo(){
        setShipmentNumber(shipmentNo);
        setRouteNo(routeNo)
    }


    return (
        <React.Fragment>
            <tr>
                <td>{shipmentNo}</td>
                <td>{routeNo}</td>
                <td>{shipID}</td>
                <td>{weight}</td>
                <td><button onClick={setShipmentNo}>Select</button></td>
            </tr>
        </React.Fragment>
    )
}

export default ShipmentNo;