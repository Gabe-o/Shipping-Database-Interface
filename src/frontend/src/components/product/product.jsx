import React from "react";
import { useState } from "react";
import ProductDeletePopup from "./productDeletePopup";
import ProductUpdatePopup from "./productUpdatePopup";

function Product(product) {

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
                <td>{product.productID}</td>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>{product.weight}</td>
                <td>{product.email}</td>
                <td><button onClick={updateButton}>Update</button><button onClick={deleteButton}>Delete</button></td>
            </tr>
            {update ? <ProductUpdatePopup buttonState={setUpdateState} product={product} /> : null}
            {remove ? <ProductDeletePopup buttonState={setRemoveState} product={product} /> : null}
        </React.Fragment>
    )
}

export default Product;