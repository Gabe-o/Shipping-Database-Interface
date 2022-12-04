import React, { useState } from 'react';
import '../../styles/popup.css';

const ProductUpdatePopup = ({ buttonState, product }) => {

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
        fetch("/api/products", { method: "PUT", body: JSON.stringify({ "productName": inputs.productName ? inputs.productName : null, "price": inputs.price ? inputs.price : null, "weight": inputs.weight ? inputs.weight : null }), headers: new Headers({ 'Content-Type': 'application/json' }) })
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
                        <h1 className='header'>Edit product with product id: {product.productID}</h1>
                        <form onSubmit={handleSubmit}>
                            <label className="form-label">Product Name:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="productName"
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                />
                            </label>
                            <label className="form-label">Price:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="price"
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                />
                            </label>
                            <label className="form-label">Weight:
                                <input
                                    className="form-input"
                                    type="text"
                                    name="weight"
                                    onChange={handleChange}
                                    placeholder="Enter weight"
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

export default ProductUpdatePopup;