import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/homePage";
import Navbar from "./components/navbar";
import Clients from "./pages/clients";
import Products from "./pages/products";
import Shipments from "./pages/shipments";
import ShipmentProductInfo from "./pages/shipmentProductionInformation";
import ShipmentDates from "./pages/shipmentDates";
import Ports from "./pages/ports";
import RoutesPage from "./pages/routes";
import Ships from "./pages/ships";
import './styles/app.css';

function App() {
  return (
        <BrowserRouter>
            <div className='App'>
            <Navbar />
                <Routes>
                    <Route path="" element={<HomePage />}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/clients" element={<Clients/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/shipments" element={<Shipments/>}/>
                    <Route path="/shipmentProductInformation" element={<ShipmentProductInfo/>}/>
                    <Route path="/shipmentDates" element={<ShipmentDates/>}/>
                    <Route path="/routes" element={<RoutesPage/>}/>
                    <Route path="/ports" element={<Ports/>}/>
                    <Route path="/ships" element={<Ships/>}/>
                </Routes>
            </div>
        </BrowserRouter>
  );
}

export default App;
