import React from "react";
import { useEffect, useState } from 'react';
import ClientInvoice from "../components/client/clientInvoice";

function GenerateInvoice() {


    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState([]);
    const [buttonState, setButtonState] = useState(false);

    useEffect(() => {
        fetch("/api/clients", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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
        fetch("/api/clients/primaryKey?email=" + inputs.email, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => {
                return res.json().then(data => {
                    if (res.ok) {
                        setResults(data)
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

    return (
        <React.Fragment>
            <h1>Generate Invoice for Client's</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" onChange={handleChange} placeholder="Email" value={inputs.email || ""} />
            </form>
            <table>
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Number of shipments</th>
                    <th>Create Invoice</th>
                </tr>
                {results.length !== 0 ? results.map((client, c) => <ClientInvoice {...client} key={c} />) : null}
            </table>
        </React.Fragment>
    );
}

export default GenerateInvoice;