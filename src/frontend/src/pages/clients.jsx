import React from 'react';
import { useEffect, useState } from 'react';
import Client from '../components/client';

function ClientsPage() {

    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("http://" + window.location.hostname + ":9000/api/clients", {method: "GET", headers: new Headers({ 'Content-Type': 'application/json' })})
        .then(res => res.json())
        .then(data => {
            setResults(data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const handleSubmit = () => {
        fetch("http://" + window.location.hostname + ":9000/api/clients/primaryKey?email=" + inputs.email, {method: "GET", headers: new Headers({ 'Content-Type': 'application/json' })})
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
            <h1>Client's Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" onChange={handleChange} placeholder="Email" value={inputs.email || ""} />
            </form>
        </React.Fragment>
    );
}

export default ClientsPage;