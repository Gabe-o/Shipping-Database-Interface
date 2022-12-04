import React from "react";

function Port(port) {

    return (
        <React.Fragment>
            <React.Fragment>
                <tr>
                    <td>{port.portNo}</td>
                    <td>{port.region}</td>
                    <td>{port.portName}</td>
                    <td>{port.country}</td>
                    <td>{port.latitude}</td>
                    <td>{port.longitude}</td>
                    <td><button>Update</button><button>Delete</button></td>
                </tr>
            </React.Fragment>
        </React.Fragment>
    )
}

export default Port;