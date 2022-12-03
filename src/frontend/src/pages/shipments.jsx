import React from 'react';
import { useEffect, useState } from 'react';
import Shipment from '../components/shipment';

function ShipmentsPage() {

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
            <h1>Shipments Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="shipmentID" onChange={handleChange} placeholder="Shipment ID" value={inputs.shipmentID || ""} />
            </form>
            
        </React.Fragment>
    );
}

export default ShipmentsPage;