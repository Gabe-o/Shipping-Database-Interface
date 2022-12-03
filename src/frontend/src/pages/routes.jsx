import React from 'react';
import { useEffect, useState } from 'react';
import Route from '../components/route';

function RoutesPage() {

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
            <h1>Routes Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="routeNo" onChange={handleChange} placeholder="Route Number" value={inputs.routeNo || ""} />
            </form>
        </React.Fragment>
    );
}

export default RoutesPage;