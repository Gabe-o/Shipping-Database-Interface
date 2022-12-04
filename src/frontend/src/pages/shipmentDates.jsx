import React from 'react';
import { useEffect, useState } from 'react';
import ShipmentDate from '../components/shipmentDate';

function ShipmentDatesPage() {

    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("/api/shipmentDates", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                setResults(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("/api/shipmentDates/primaryKey?routeNo=" + inputs.routeNo + "&departureDate=" + inputs.departureDate + "&shipID=" + inputs.shipID, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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
            <h1>Shipment Dates Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="routeNo" onChange={handleChange} placeholder="Route Number" value={inputs.routeNo || ""} />
                <input type="text" name="departureDate" onChange={handleChange} placeholder="Departure Date" value={inputs.departureDate || ""} />
                <input type="text" name="shipID" onChange={handleChange} placeholder="Ship ID" value={inputs.shipID || ""} />
                <button type="submit">Search</button>
            </form>
        </React.Fragment>
    );
}

export default ShipmentDatesPage;