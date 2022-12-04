import React, { useState } from 'react';
import '../../styles/popup.css';

const ShipmentUpdatePopup = ({ buttonState, shipment }) => {

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
        fetch("/api/shipments", { method: "PUT", body: JSON.stringify({ "shipmentNo": shipment.shipmentNo, "shipmentFee": inputs.shipmentFee ? inputs.shipmentFee : null, "status": inputs.status ? inputs.status : null, "departureDate": inputs.departureDate ? inputs.departureDate : null }), headers: new Headers({ 'Content-Type': 'application/json' }) })
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
                        <h1 className='header'>Edit shipment with shipment number: {shipment.shipmentNo}</h1>
                        <form onSubmit={handleSubmit}>
                            <label className="form-label">Shipment Fee:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="shipmentFee"
                                    onChange={handleChange}
                                    placeholder="Enter shipment fee"
                                />
                            </label>
                            <label className="form-label">Status:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="status"
                                    onChange={handleChange}
                                    placeholder="Enter status"
                                />
                            </label>
                            <label className="form-label">Departure Date:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="departureDate"
                                    onChange={handleChange}
                                    placeholder="Enter departureDate"
                                />
                            </label>
                            <button className="form-button" type="submit">Update</button>
                        </form>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default ShipmentUpdatePopup;