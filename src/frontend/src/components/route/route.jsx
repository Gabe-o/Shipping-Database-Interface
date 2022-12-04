import React from "react";

function Route(route) {

    return (
        <React.Fragment>
            <tr>
                <td>{route.routeNo}</td>
                <td>{route.startingPortNo}</td>
                <td>{route.endingPortNo}</td>
                <td>{route.distance}</td>
                <td><button>Update</button><button>Delete</button></td>
            </tr>
        </React.Fragment>
    )
}

export default Route;