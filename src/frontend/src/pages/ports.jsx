import React from 'react';
import { useEffect, useState } from 'react';
import Port from '../components/port/port';

function PortsPage() {

    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("/api/ports", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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

        fetch("/api/ports/primaryKey?portNo=" + inputs.portNo, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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
            <h1>Ports Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="portNo" onChange={handleChange} placeholder="Port Number" value={inputs.portNo || ""} />
            </form>
            <table>
                <tr>
                    <th>Port Number</th>
                    <th>Region</th>
                    <th>Port Name</th>
                    <th>Country</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Edit Table</th>
                </tr>
                {results.length !== 0 ? results.map((port, c) => <Port {...port} key={c} />) : null}
            </table>
        </React.Fragment>
    );
}

export default PortsPage;