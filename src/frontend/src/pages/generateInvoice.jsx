import React from "react";
import { useState } from "react";

function GenerateInvoice() {

    const [inputs, setInputs] = useState({});

    const handleChange = () => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = () => {

    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" onChange={handleChange} placeholder="Email" value={inputs.email || ""} />
        </form>
    )
}

export default GenerateInvoice;