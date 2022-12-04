import React from 'react';
import { useEffect, useState } from 'react';
import Shipment from '../components/shipment/shipment';

function ShipmentsPage() {

    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("/api/shipments", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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

        fetch("/api/shipments/primaryKey?shipmentID=" + inputs.shipmentID, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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
            <h1>Shipments Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="shipmentID" onChange={handleChange} placeholder="Shipment ID" value={inputs.shipmentID || ""} />
            </form>
            <table>
                <tr>
                    <th>Shipment Number</th>
                    <th>Route Number</th>
                    <th>Shipment Fee ($)</th>
                    <th>Status</th>
                    <th>Departure Date (yyyy/mm/dd hh:mm:ss)</th>
                    <th>Ship ID</th>
                    <th>Email</th>
                    <th>Edit Table</th>
                </tr>
                {results.length !== 0 ? results.map((shipment, c) => <Shipment {...shipment} key={c} />) : null}
            </table>
        </React.Fragment>
    );
}

export default ShipmentsPage;