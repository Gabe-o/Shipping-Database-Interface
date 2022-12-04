import React, { useState } from 'react';
import '../../styles/popup.css';

const PortUpdatePopup = ({ buttonState, port }) => {

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
        fetch("/api/ports", { method: "PUT", body: JSON.stringify({ "portNo": port.portNo, "region": inputs.region ? inputs.region : null, "portName": inputs.portName ? inputs.portName : null, "country": inputs.country ? inputs.country : null, "latitude": inputs.latitude ? inputs.latitude : null, "longitude": inputs.longitude ? inputs.longitude : null }), headers: new Headers({ 'Content-Type': 'application/json' }) })
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
                        <h1 className='header'>Edit port with port number: {port.portNo}</h1>
                        <form onSubmit={handleSubmit}>
                            <label className="form-label">Region:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="region"
                                    onChange={handleChange}
                                    placeholder="Enter region"
                                />
                            </label>
                            <label className="form-label">Port Name:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="portName"
                                    onChange={handleChange}
                                    placeholder="Enter port name"
                                />
                            </label>
                            <label className="form-label">Country:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="country"
                                    onChange={handleChange}
                                    placeholder="Enter coutry"
                                />
                            </label>
                            <label className="form-label">Latitude:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="latitude"
                                    onChange={handleChange}
                                    placeholder="Enter latitude"
                                />
                            </label>
                            <label className="form-label">Longitude:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="longitude"
                                    onChange={handleChange}
                                    placeholder="Enter longitude"
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

export default PortUpdatePopup;