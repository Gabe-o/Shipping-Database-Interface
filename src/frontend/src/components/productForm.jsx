import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProductInput from "./productInput";

function ProductForm({ client }) {

    const [products, setProducts] = useState([]);
    const [productInputs, setProductInputs] = useState({});
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        fetch("/api/products/email?email=" + client.email, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => {
                return res.json().then(data => {
                    if (res.ok) {
                        setProducts(data);
                    }
                    else {
                        throw new Error(res.status + "\n" + JSON.stringify(data));
                    }
                })
            })
            .catch(err => {
                setProducts([]);
                alert(err);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/complex/shipment", { method: "POST", body: JSON.stringify({ "email": client.email, "products": productInputs, "routeNo": inputs.routeNo }), headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => {
                return res.json().then(data => {
                    if (res.ok) {
                        alert("Succesfully created shipment!");
                    }
                    else {
                        throw new Error(res.status + "\n" + JSON.stringify(data));
                    }
                })
            })
            .catch(err => {
                alert(err);
            });

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    return (
        <React.Fragment>
            <h2>Add Products to shipment for client with email {client.email}</h2>
            <form onSubmit={handleSubmit}>
                {products.map(element => <ProductInput name={element.productName} id={element.productID} productInputs={productInputs} setProductInputs={setProductInputs} key={element.productID} />)}
                <label>Route Number: </label>
                <input type="number" name="routeNo" onChange={handleChange} placeholder="Route Number" value={inputs.routeNo || ""} />
                <br />
                <br />
                <button type="submit">Add Shipment</button>
            </form>
        </React.Fragment>
    )
}

export default ProductForm;