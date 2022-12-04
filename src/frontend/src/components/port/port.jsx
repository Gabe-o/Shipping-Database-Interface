import React from "react";
import { useState } from "react";
import PortDeletePopup from "./portDeletePopup";
import PortUpdatePopup from "./portUpdatePopup";

function Port(port) {

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
                <td>{port.portNo}</td>
                <td>{port.region}</td>
                <td>{port.portName}</td>
                <td>{port.country}</td>
                <td>{port.latitude}</td>
                <td>{port.longitude}</td>
                <td><button onClick={updateButton}>Update</button><button onClick={deleteButton}>Delete</button></td>
            </tr>
            {update ? <PortUpdatePopup buttonState={setUpdateState} port={port} /> : null}
            {remove ? <PortDeletePopup buttonState={setRemoveState} port={port} /> : null}
        </React.Fragment>

    )
}

export default Port;