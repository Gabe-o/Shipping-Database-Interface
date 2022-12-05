import React from "react";
import { useState } from "react";
import Invoice from "../invoice";

function ClientInvoice(client) {

    const [invoice, setInvoiceState] = useState(false);
    const [button, setButtonState] = useState(false);

    const generateInvoice = () => {
        setButtonState(!button);
        fetch("/api/complex/invoice?email=" + client.email, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => {
                return res.json().then(data => {
                    if (res.ok) {

                        const uniqueShipmentNumbers = [];
                        const shipments = [];

                        for (const object of data) {
                            if (!uniqueShipmentNumbers.includes(object.shipmentNo)) {

                                uniqueShipmentNumbers.push(object.shipmentNo);
                            }
                        }

                        console.log(uniqueShipmentNumbers.length);

                        for (let c = 0; c < uniqueShipmentNumbers.length; c++) {
                            let tempShipment = [];
                            for (let c2 = 0; c2 < data.length; c2++) {
                                if (uniqueShipmentNumbers[c] === data[c2].shipmentNo) {
                                    tempShipment.push(data[c2]);
                                }
                            }
                            shipments.push(tempShipment);
                        }

                        setInvoiceState(shipments);
                    }
                    else {
                        throw new Error(res.status + "\n" + JSON.stringify(data));
                    }
                })
            })
            .catch(err => {
                alert(err);
            });
    }
    return (
        <React.Fragment>
            <tr>
                <td>{client.email}</td>
                <td>{client.name}</td>
                <td>{client.phoneNo}</td>
                <td><button onClick={generateInvoice}>{!button ? "Generate Invoice" : "Close"}</button></td>
            </tr>
            {invoice && button ? <React.Fragment><h1>Invoice(s) for {client.email}</h1>{invoice.map((invoice, c) => <Invoice {...invoice} key={c} />)}</React.Fragment> : null}
        </React.Fragment>
    )
}

export default ClientInvoice;