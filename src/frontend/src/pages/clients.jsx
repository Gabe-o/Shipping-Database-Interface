import React from 'react';
import { useEffect, useState } from 'react';
import Client from '../components/client';

function ClientsPage() {

    const [inputs, setInputs] = useState({});

    useEffect(() => {

    }, []);

    const handleSubmit = () => {

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