import React from "react";

function ProductDetail(productDetail) {

    return (
        <React.Fragment>
            <tr>
                <td>{productDetail.shipmentNo}</td>
                <td>{productDetail.productID}</td>
                <td>{productDetail.quantity}</td>
                <td><button>Update</button><button>Delete</button></td>
            </tr>
        </React.Fragment>
    )
}

export default ProductDetail;