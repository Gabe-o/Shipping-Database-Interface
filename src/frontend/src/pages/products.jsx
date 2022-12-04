import React from 'react';
import { useEffect, useState } from 'react';
import Product from '../components/product/product';

function ProductsPage() {

    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("/api/products", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                setResults(data);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/products/primaryKey?productID=" + inputs.productID, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                setResults(data);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
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
            <table>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price ($)</th>
                    <th>Weight (kg)</th>
                    <th>Email</th>
                    <th>Edit Table</th>
                </tr>
                {results.length !== 0 ? results.map((product, c) => <Product {...product} key={c} />) : null}
            </table>
        </React.Fragment>
    );
}

export default ProductsPage;