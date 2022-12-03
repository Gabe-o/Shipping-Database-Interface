import React from 'react';
import { useEffect, useState } from 'react';
import ProductDetail from '../components/productDetail';

function ProductDetailsPage() {

    const [inputs, setInputs] = useState({});

    useEffect(() => {

    }, []);

    const handleSubmit = () => {

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    
    return (
        <React.Fragment>
            <h1>Shipment Product Info Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="shipmentNo" onChange={handleChange} placeholder="Shipment Number" value={inputs.shipmentNo || ""} />
                <input type="text" name="productID" onChange={handleChange} placeholder="Product ID" value={inputs.productID || ""} />
                <button type="submit">Search</button>
            </form>
        </React.Fragment>
    );
}

export default ProductDetailsPage;