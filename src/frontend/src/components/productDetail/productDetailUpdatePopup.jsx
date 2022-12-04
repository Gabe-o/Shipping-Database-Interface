import React, { useState } from 'react';
import '../../styles/popup.css';

const ProductDetailUpdatePopup = ({ buttonState, productDetail }) => {

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
        fetch("/api/productDetails", { method: "PUT", body: JSON.stringify({ "shipmentNo": productDetail.shipmentNo, "productID": productDetail.productID, "quantity": inputs.quantity ? inputs.quantity : null }), headers: new Headers({ 'Content-Type': 'application/json' }) })
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
                        <h1 className='header'>Edit Product Detail with with shipment number: {productDetail.shipmentNo} and product id: {productDetail.productID}</h1>
                        <form onSubmit={handleSubmit}>
                            <label className="form-label">
                                Quantity:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="quantity"
                                    onChange={handleChange}
                                    placeholder="Enter quantity"
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

export default ProductDetailUpdatePopup;