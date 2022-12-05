import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/homePage";
import Navbar from "./components/navbar";
import ClientsPage from "./pages/clients";
import ProductsPage from "./pages/products";
import ShipmentsPage from "./pages/shipments";
import ProductDetailsPage from "./pages/productDetails";
import ShipmentDatesPage from "./pages/shipmentDates";
import PortsPage from "./pages/ports";
import RoutesPagePage from "./pages/routes";
import ShipsPage from "./pages/ships";
import AssignRoutes from "./pages/assignRoutes";
import AssignShips from "./pages/assignShips";
import './styles/app.css';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Navbar />
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/clients" element={<ClientsPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/shipments" element={<ShipmentsPage />} />
                    <Route path="/shipmentProductInformation" element={<ProductDetailsPage />} />
                    <Route path="/shipmentDates" element={<ShipmentDatesPage />} />
                    <Route path="/routes" element={<RoutesPagePage />} />
                    <Route path="/ports" element={<PortsPage />} />
                    <Route path="/ships" element={<ShipsPage />} />
                    <Route path="/assignRoutes" element={<AssignRoutes />} />
                    <Route path="/assignShips" element={<AssignShips />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
