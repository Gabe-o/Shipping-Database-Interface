import React from "react";
import { useState } from "react";


function Ships({ shipID, shipName, maxCargoWeight, captain, routeNo, homePortNo, maxRange, speed }) {



    return (
        <>
            <tr>
                <td>{shipID}</td>
                <td>{shipName}</td>
                <td>{maxCargoWeight}</td>
                <td>{captain}</td>
                <td>{routeNo}</td>
                <td>{homePortNo}</td>
                <td>{maxRange}</td>
                <td>{speed}</td>
               
            </tr>
        </>
    );
}

export default Ships;