import React, { useState } from 'react';
import '../../styles/popup.css';

const ShipmentDateInsertPopup = ({ buttonState }) => {

    const [inputs, setInputs] = useState({});

    const handleClose = () => {
        buttonState(false);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/shipmentDates", { method: "POST", body: JSON.stringify({ "routeNo": inputs.routeNo ? inputs.routeNo : null, "departureDate": inputs.departureDate ? inputs.departureDate : null, "shipID": inputs.shipID ? inputs.shipID : null, "estArrivalDate": inputs.estArrivalDate ? inputs.estArrivalDate : null }), headers: new Headers({ 'Content-Type': 'application/json' }) })
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
                        <h1 className='header'>Create shipment date Form</h1>
                        <form onSubmit={handleSubmit}>
                            <label className="form-label">Route Number:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="routeNo"
                                    onChange={handleChange}
                                    placeholder="Enter route number"
                                />
                            </label>
                            <label className="form-label">Departure Date:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="departureDate"
                                    onChange={handleChange}
                                    placeholder="Enter departure date"
                                />
                            </label>
                            <label className="form-label">Ship ID:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="shipID"
                                    onChange={handleChange}
                                    placeholder="Enter ship id"
                                />
                            </label>
                            <label className="form-label">Estimated Arrival Date:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="estArrivalDate"
                                    onChange={handleChange}
                                    placeholder="Enter estimated arrival date"
                                />
                            </label>
                            <button className="form-button" type="submit">Add</button>
                        </form>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default ShipmentDateInsertPopup;