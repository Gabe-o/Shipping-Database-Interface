import React from "react";

function UnitPrice(product) {

    return (
        <tr>
            <td>{product.productID}</td>
            <td>{product.productName}</td>
            <td>{product.quantity}</td>
            <td>{product.weight}</td>
            <td>{(product.quantity * product.weight * 0.05).toFixed(2)}</td>
        </tr>
    )
}

export default UnitPrice;