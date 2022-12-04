import React from "react";
import { useState } from "react";
import RouteDeletePopup from "./routeDeletePopup";
import RouteUpdatePopup from "./routeUpdatePopup";

function Route(route) {

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
                <td>{route.routeNo}</td>
                <td>{route.startingPortNo}</td>
                <td>{route.endingPortNo}</td>
                <td>{route.distance}</td>
                <td><button onClick={updateButton}>Update</button><button onClick={deleteButton}>Delete</button></td>
            </tr>
            {update ? <RouteUpdatePopup buttonState={setUpdateState} route={route} /> : null}
            {remove ? <RouteDeletePopup buttonState={setRemoveState} route={route} /> : null}
        </React.Fragment>
    )
}

export default Route;