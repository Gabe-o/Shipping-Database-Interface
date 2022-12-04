import React from 'react';
import { useEffect, useState } from 'react';
import Ship from '../components/ship';

function ShipsPage() {

    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("/api/ships", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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

        fetch("/api/ships/primaryKey?shipID=" + inputs.shipID, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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
            <h1>Ships Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="shipID" onChange={handleChange} placeholder="Ship ID" value={inputs.shipID || ""} />
            </form>
            <table>
                <tr>
                    <th>Ship ID</th>
                    <th>Ship Name</th>
                    <th>Max Cargo Weight (kg)</th>
                    <th>Captain</th>
                    <th>Route Number</th>
                    <th>Home Port Number</th>
                    <th>Max Range (km)</th>
                    <th>Speed (km/h)</th>
                    <th>Edit Table</th>
                </tr>
                {results.length !== 0 ? results.map((ship, c) => <Ship {...ship} key={c} />) : null}
            </table>
        </React.Fragment>
    );
}

export default ShipsPage;