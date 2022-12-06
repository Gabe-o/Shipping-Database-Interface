import React from "react";
import { useState } from "react";
import ProductForm from "../productForm";
import ClientUpdatePopup from "./clientUpdatePopup";
import ClientDeletePopup from "./clientDeletePopup";

function ClientShipment({ email, name, phoneNo, setClient }) {

    const [buttonState, setButtonState] = useState(false);

    const addButton = () => {
        setClient({ email: email, name: name, phoneNo: phoneNo });
    }

    return (
        <React.Fragment>
            <tr>
                <td>{email}</td>
                <td>{name}</td>
                <td>{phoneNo}</td>
                <td><button onClick={addButton}>Add</button></td>
            </tr>
        </React.Fragment>
    )
}

export default ClientShipment;