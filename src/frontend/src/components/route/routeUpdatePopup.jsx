import React, { useState } from 'react';
import '../../styles/popup.css';

const RouteUpdatePopup = ({ buttonState, route }) => {

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
        fetch("/api/routes", { method: "PUT", body: JSON.stringify({ "routeNo": route.routeNo, "distance": inputs.distance ? inputs.distance : null }), headers: new Headers({ 'Content-Type': 'application/json' }) })
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
                        <h1 className='header'>Edit route with route number: {route.routeNo}</h1>
                        <form onSubmit={handleSubmit}>
                            <label className="form-label">Distance:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="distance"
                                    onChange={handleChange}
                                    placeholder="Enter distance"
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

export default RouteUpdatePopup;