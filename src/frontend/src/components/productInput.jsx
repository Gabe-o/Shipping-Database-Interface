import React from "react";

function ProductInput({ name, id, productInputs, setProductInputs }) {

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setProductInputs(values => ({ ...values, [name]: value }));
    }

    return (
        <React.Fragment>
            <label>{name}: </label>
            <input type="number" min="0" name={id} onChange={handleChange} placeholder="Enter Quantity" value={productInputs[id] || ""} />
            <br />
            <br />
        </React.Fragment>

    )
}

export default ProductInput;