import React from 'react';
import { useEffect, useState } from 'react';
import Product from '../components/product';

function ProductsPage() {

    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("http://" + window.location.hostname +":9000/api/products", {method: "GET", headers: new Headers({ 'Content-Type': 'application/json' })})
        .then(res => res.json())
        .then(data => {
            setResults(data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const handleSubmit = () => {
        fetch("http://" + window.location.hostname + ":9000/api/products/primaryKey?productID=" + inputs.productID, {method: "GET", headers: new Headers({ 'Content-Type': 'application/json' })})
        .then(res => res.json())
        .then(data => {
            setResults(data);
        })
        .catch(err => {
            console.log(err);
        })
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