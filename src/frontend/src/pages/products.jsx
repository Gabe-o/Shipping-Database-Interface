import React from 'react';
import { useEffect, useState } from 'react';
import Product from '../components/product';

function ProductsPage() {

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
            <h1>Products Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="productID" onChange={handleChange} placeholder="Product ID" value={inputs.productID || ""} />
            </form>
        </React.Fragment>
    );
}

export default ProductsPage;