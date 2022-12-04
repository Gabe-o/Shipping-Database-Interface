import React, { useState } from 'react';
import '../../styles/popup.css';

const ShipmentDateDeletePopup = ({ buttonState, shipmentDate }) => {

    const handleClose = () => {
        buttonState(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/shipmentDates", { method: "DELETE", body: JSON.stringify({ "routeNo": shipmentDate.routeNo, "departureDate": shipmentDate.departureDate, "shipID": shipmentDate.shipID }), headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => {
                return res.json().then(data => {
                    if (res.ok) {
                        buttonState(false);
                    }
                    else {
                        throw new Error(res.status + "\n" + JSON.stringify(data));
                    }
                })
            })
            .catch(err => {
                alert(err);
                buttonState(false);
            });

    };

    return (
        <React.Fragment>
            {
                <React.Fragment>
                    <div className="popup-overlay" />
                    <div className="popup">
                        <button className="popup-close" onClick={handleClose}>X</button>
                        <h1 className='header'>Are you sure you want to delete shipment date with route number: {shipmentDate.routeNo}, departureDate: {shipmentDate.departureDate} and ship id: {shipmentDate.shipID}?</h1>
                        <form onSubmit={handleSubmit}>
                            <button className="form-button" type="submit">Delete</button>
                        </form>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default ShipmentDateDeletePopup;