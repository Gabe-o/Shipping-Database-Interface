import React from "react";

function Product(product) {

    return (
        <React.Fragment>
            <tr>
                <td>{product.productID}</td>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>{product.weight}</td>
                <td>{product.email}</td>
                <td><button>Update</button><button>Delete</button></td>
            </tr>
        </React.Fragment>
    )
}

export default Product;