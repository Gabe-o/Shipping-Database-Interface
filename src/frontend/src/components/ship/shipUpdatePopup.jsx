import React, { useState } from 'react';
import '../../styles/popup.css';

const ShipUpdatePopup = ({ buttonState, ship }) => {

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
        fetch("/api/ships", { method: "PUT", body: JSON.stringify({ "shipID": ship.shipID, "shipName": inputs.shipName ? inputs.shipName : null, "maxCargoWeight": inputs.maxCargoWeight ? inputs.maxCargoWeight : null, "captain": inputs.captain ? inputs.captain : null, "routeNo": inputs.routeNo ? inputs.routeNo : null, "homePortNo": inputs.homePortNo ? inputs.homePortNo : null, "maxRange": inputs.maxRange ? inputs.maxCargoWeight : null, "speed": inputs.speed ? inputs.speed : null }), headers: new Headers({ 'Content-Type': 'application/json' }) })
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
                        <h1 className='header'>Edit ship with ship id: {ship.shipID}</h1>
                        <form onSubmit={handleSubmit}>
                            <label className="form-label">Ship Name:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="shipName"
                                    onChange={handleChange}
                                    placeholder="Enter ship name"
                                />
                            </label>
                            <label className="form-label">Max Cargo Weight
                                <input
                                    className="form-input"
                                    type="text"
                                    name="maxCargoWeight"
                                    onChange={handleChange}
                                    placeholder="Enter max cargo weight"
                                />
                            </label>
                            <label className="form-label">
                                Captain:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="captain"
                                    onChange={handleChange}
                                    placeholder="Enter captain"
                                />
                            </label>
                            <label className="form-label">
                                Home Port Number:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="homePortNo"
                                    onChange={handleChange}
                                    placeholder="Enter home port number"
                                />
                            </label>
                            <label className="form-label">
                                Max Range:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="maxRange"
                                    onChange={handleChange}
                                    placeholder="Enter max range"
                                />
                            </label>
                            <label className="form-label">
                                Speed:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="speed"
                                    onChange={handleChange}
                                    placeholder="Enter speed"
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

export default ShipUpdatePopup;