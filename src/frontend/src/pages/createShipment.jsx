import React from "react";
import ClientShipment from "../components/client/clientShipment";
import { useState } from "react";
import Product from "../components/product/product";
import ProductForm from "../components/productForm";
import "../styles/createdShipment.css"

function CreateShipment() {

    const [inputs, setInputs] = useState({});
    const [searchResult, setSearchResult] = useState("");
    const [searchState, setSearchState] = useState(false);
    const [results, setResults] = useState([]);
    const [client, setClient] = useState(null);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchState(false);
        setSearchResult(inputs.email);
        console.log(inputs.email);
        fetch("/api/clients/primaryKey?email=" + (inputs.email ? inputs.email : ""), { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => {
                return res.json().then(data => {
                    if (res.ok) {
                        setResults(data);
                        setSearchState(true);
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

    const closeButton = (event) => {
        event.preventDefault();
        setClient(null);
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <label>Search Client:
                    <input type="text" name="email" onChange={handleChange} placeholder="Email" value={inputs.email || ""} />
                </label>
            </form>
            <div className="shipmentForm">
                <table>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Create Shipment</th>
                    </tr>
                    {searchState ? results.map(result => <ClientShipment email={result.email} name={result.name} phoneNo={result.phoneNo} key={result.email} setClient={setClient} />) : null}
                </table>
            </div>

            <div className="shipmentForm">
                {client ? <ProductForm client={client} /> : null}
                <br />
                {client ? <button onClick={closeButton}>Close</button> : null}
            </div>

        </React.Fragment>
    )
}

export default CreateShipment;