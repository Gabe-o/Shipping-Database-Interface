import React from 'react';
import { useEffect, useState } from 'react';
import ProductDetail from '../components/productDetail/productDetail';
import ProductDetailInsertPopup from '../components/productDetail/productDetailInsertPopup';

function ProductDetailsPage() {

    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState([]);
    const [buttonState, setButtonState] = useState(false);

    useEffect(() => {
        fetch("/api/productDetails", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => {
                return res.json().then(data => {
                    if (res.ok) {
                        setResults(data);
                    }
                    else {
                        throw new Error(res.status + "\n" + JSON.stringify(data));
                    }
                })
            })
            .catch(err => {
                alert(err);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/productDetails/primaryKey?shipmentNo=" + inputs.shipmentNo + "&productID=" + inputs.productID, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => {
                return res.json().then(data => {
                    if (res.ok) {
                        setResults(data);
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
        setInputs(values => ({ ...values, [name]: value }))
    }

    const insertProductDetailButton = () => {
        setButtonState(!buttonState);
    }

    return (
        <React.Fragment>
            <h1>Shipment Product Info Page</h1>
            <button onClick={insertProductDetailButton}>Add Product Detail</button>
            <form onSubmit={handleSubmit}>
                <input type="text" name="shipmentNo" onChange={handleChange} placeholder="Shipment Number" value={inputs.shipmentNo || ""} />
                <input type="text" name="productID" onChange={handleChange} placeholder="Product ID" value={inputs.productID || ""} />
                <button type="submit">Search</button>
            </form>
            <tr>
                <th>Shipment Number</th>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Edit Table</th>
            </tr>
            {results.length !== 0 ? results.map((productDetail, c) => <ProductDetail {...productDetail} key={c} />) : null}
            {buttonState ? <ProductDetailInsertPopup buttonState={setButtonState} /> : null}
        </React.Fragment>
    );
}

export default ProductDetailsPage;