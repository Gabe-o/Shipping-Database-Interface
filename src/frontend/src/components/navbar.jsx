import React from "react"
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const homeButton = () => {
        navigate("/home", { replace: true });
    }

    const clientsButton = () => {
        navigate("/clients", { replace: true });
    }

    const productsButton = () => {
        navigate("/products", { replace: true });
    }

    const shipmentsButton = () => {
        navigate("/shipments", { replace: true });
    }

    const shipmentProductInformationButton = () => {
        navigate("/shipmentProductInformation", { replace: true });
    }

    const shipmentDatesButton = () => {
        navigate("/shipmentDates", { replace: true });
    }

    const routesButton = () => {
        navigate("/routes", { replace: true });
    }

    const portsButton = () => {
        navigate("/ports", { replace: true });
    }

    const shipsButton = () => {
        navigate("/ships", { replace: true });
    }

    const assignShipsButton = () => {
        navigate("/assignShips", { replace: true });
    }

    const assignRoutesButton = () => {
        navigate("/assignRoutes", { replace: true });
    }

    const generateInvoiceButton = () => {
        navigate("/generateInvoice", { replace: true });
    }

    const popularPortsButton = () => {
        navigate("/popularPorts", { replace: true });
    }

    //returns button in nav bar
    return (
        <React.Fragment>
            <nav>
                <div className="navBarDiv">
                    <ul>
                        <li>
                            <button className="navBarB" onClick={homeButton}>Home</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={clientsButton}>Clients</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={productsButton}>Products</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={shipmentsButton}>Shipments</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={shipmentProductInformationButton}>Shipment Product Information</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={shipmentDatesButton}>Shipment Dates</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={routesButton}>Routes</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={portsButton}>Ports</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={shipsButton}>Ships</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={assignShipsButton}>Assign Ships</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={assignRoutesButton}>Assign Routes</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={generateInvoiceButton}>Generate Invoice</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={popularPortsButton}>Most used Ports</button>
                        </li>
                    </ul>
                </div>
            </nav> <br></br><br></br>
        </React.Fragment>
    )
}

export default Navbar;