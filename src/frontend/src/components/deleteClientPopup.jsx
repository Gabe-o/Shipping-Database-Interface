import React, { useState } from 'react';
import '../styles/clientPopup.css';

const ClientDeletePopup = ({ buttonState, client }) => {

    const handleClose = () => {
        buttonState(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/clients", { method: "DELETE", body: JSON.stringify({ "email": client.email }), headers: new Headers({ 'Content-Type': 'application/json' }) })
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
                        <h1>Are you sure you want to delete client with email: {client.email}?</h1>
                        <form onSubmit={handleSubmit}>
                            <button className="form-button" type="submit">Delete</button>
                        </form>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default ClientDeletePopup;