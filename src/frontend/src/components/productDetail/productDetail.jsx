import React from "react";
import { useState } from "react";
import ProductDetailDeletePopup from "./productDetailDeletePopup";
import ProductDetailUpdatePopup from "./productDetailUpdatePopup";

function ProductDetail(productDetail) {

    const [remove, setRemoveState] = useState(false);
    const [update, setUpdateState] = useState(false);

    const updateButton = () => {
        setUpdateState(!update);
    }

    const deleteButton = () => {
        setRemoveState(!remove);
    }

    return (
        <React.Fragment>
            <tr>
                <td>{productDetail.shipmentNo}</td>
                <td>{productDetail.productID}</td>
                <td>{productDetail.quantity}</td>
                <td><button onClick={updateButton}>Update</button><button onClick={deleteButton}>Delete</button></td>
            </tr>
            {update ? <ProductDetailUpdatePopup buttonState={setUpdateState} productDetail={productDetail} /> : null}
            {remove ? <ProductDetailDeletePopup buttonState={setRemoveState} productDetail={productDetail} /> : null}
        </React.Fragment>
    )
}

export default ProductDetail;