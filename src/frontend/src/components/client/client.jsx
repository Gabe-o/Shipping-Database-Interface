import React from "react";
import { useState } from "react";
import ClientUpdatePopup from "./clientUpdatePopup";
import ClientDeletePopup from "./clientDeletePopup";

function Client(client) {

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
                <td>{client.email}</td>
                <td>{client.name}</td>
                <td>{client.phoneNo}</td>
                <td><button onClick={updateButton}>Update</button><button onClick={deleteButton}>Delete</button></td>
            </tr>
            {update ? <ClientUpdatePopup buttonState={setUpdateState} client={client} /> : null}
            {remove ? <ClientDeletePopup buttonState={setRemoveState} client={client} /> : null}
        </React.Fragment>
    )
}

export default Client;