import React from 'react';
import { useEffect, useState } from 'react';
import Port from '../components/port';

function PortsPage() {

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
            <h1>Ports Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="portNo" onChange={handleChange} placeholder="Port Number" value={inputs.portNo || ""} />
            </form>
        </React.Fragment>
    );
}

export default PortsPage;