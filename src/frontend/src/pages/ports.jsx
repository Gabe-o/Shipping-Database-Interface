import React from 'react';
import { useEffect, useState } from 'react';
import Port from '../components/port';

function PortsPage() {

    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("/api/ports", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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

        fetch("/api/ports/primaryKey?portNo=" + inputs.portNo, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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
            <h1>Ports Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="portNo" onChange={handleChange} placeholder="Port Number" value={inputs.portNo || ""} />
            </form>
        </React.Fragment>
    );
}

export default PortsPage;