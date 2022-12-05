import React from "react";
import { useState } from "react";
import UnitPrice from "./unitPrice";

function Invoice(invoice) {

    const [product, setProduct] = useState(Object.values(invoice).map(element => ({ ...element })));

    return (
        <React.Fragment>
            <h2>Invoice for shipment number {invoice[0].shipmentNo}</h2>
            <p>Sent to: {invoice[0].email}</p>
            <p>Shipment to travel on Route Number: {invoice[0].routeNo}</p>
            <h3>Breakdown</h3>
            <p># of distinct products: {product.length}</p>
            <p>Total price for products is calculated by quantity multipled by weight and then taking 5%</p>
            <table>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Weight (kg)</th>
                    <th>Amount ($)</th>
                </tr>
                {product.map((element, c) => <UnitPrice {...element} key={c} />)}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total Price: </td>
                    <td>{invoice[0].shipmentFee}</td>
                </tr>
            </table>

        </React.Fragment>
    )
}

export default Invoice;