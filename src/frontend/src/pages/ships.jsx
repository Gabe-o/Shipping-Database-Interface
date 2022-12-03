import React from 'react';
import { useEffect, useState } from 'react';
import Ship from '../components/ship';

function ShipsPage() {

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
            <h1>Ships Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="shipID" onChange={handleChange} placeholder="Ship ID" value={inputs.shipID || ""} />
            </form>
        </React.Fragment>
    );
}

export default ShipsPage;