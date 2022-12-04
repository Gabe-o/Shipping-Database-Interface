import React, { useState } from 'react';
import '../../styles/popup.css';

const RouteInsertPopup = ({ buttonState }) => {

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
        fetch("/api/routes", { method: "POST", body: JSON.stringify({ "routeNo": inputs.routeNo ? inputs.routeNo : null, "startingPortNo": inputs.startingPortNo ? inputs.startingPortNo : null, "endingPortNo": inputs.endingPortNo ? inputs.endingPortNo : null, "distance": inputs.distance ? inputs.distance : null }), headers: new Headers({ 'Content-Type': 'application/json' }) })
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
                        <h1 className='header'>Create Route Form</h1>
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
                            <label className="form-label">Starting Port Number:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="startingPortNo"
                                    onChange={handleChange}
                                    placeholder="Enter starting port number"
                                />
                            </label>
                            <label className="form-label">
                                Ending Port Number:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="endingPortNo"
                                    onChange={handleChange}
                                    placeholder="Enter ending port number"
                                />
                            </label>
                            <label className="form-label">
                                Distance:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="distance"
                                    onChange={handleChange}
                                    placeholder="Enter distance"
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

export default RouteInsertPopup;