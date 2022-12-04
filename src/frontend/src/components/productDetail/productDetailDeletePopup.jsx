import React, { useState } from 'react';
import '../../styles/popup.css';

const ProductDetailDeletePopup = ({ buttonState, productDetail }) => {

    const handleClose = () => {
        buttonState(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/productDetails", { method: "DELETE", body: JSON.stringify({ "shipmentNo": productDetail.shipmentNo, "productID": productDetail.productID }), headers: new Headers({ 'Content-Type': 'application/json' }) })
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
                        <h1 className='header'>Are you sure you want to delete product detail with shipment number: {productDetail.shipmentNo} and product id: {productDetail.productID}?</h1>
                        <form onSubmit={handleSubmit}>
                            <button className="form-button" type="submit">Delete</button>
                        </form>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default ProductDetailDeletePopup;