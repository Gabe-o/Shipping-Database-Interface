import React from 'react';
import { useEffect, useState } from 'react';
import ShipmentNo from "../components/shipmentWeight/shipmentNo";
import Ships from "../components/shipmentWeight/seeShips"
import "../styles/assignShips.css"

function CargoWeight() {

    const [inputs, setInputs] = useState({});
    const [shipmentNo, setShipmentNo] = useState(0);
    const [routeNo, setRouteNo] = useState(0);
    const [shipCargo, setShipCargo] = useState(0);


    const [shipmentTable, setShipmentTable] = useState([])
    const [shipsTable, setShipsTable] = useState([]);

    const onChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        console.log(shipmentNo)
        console.log(routeNo)


    }, [shipmentNo, routeNo, shipsTable])




    function shipmentNumber() {


        //get all shipment numbers
        fetch("/api/shipments/shipmentNumber", { method: 'GET', headers: new Headers({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setShipmentTable(data)





            })
            .catch(err => console.log(err))
    }



    //display all shipments, click on a shipment sends you to a page that shows all ships on that route
    //add shipment to ship, checks if it can
    //if it can, adds to the database
    function seeShipsOnRoute() {
        //  /api/complex/shipsOnRoute/:Route
        fetch("/api/complex/shipsOnRoute/" + routeNo, { method: 'GET', headers: new Headers({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setShipsTable(data)
                console.log()





            })
            .catch(err => console.log(err))
    }


    function weightComparison(e) {
        e.preventDefault();
        let selectedShip = shipsTable.find(ship => ship.shipID === parseInt(inputs.shipID));
        console.log("0: " + selectedShip.maxCargoWeight, + " " + selectedShip.shipID);

        let selectedShipment = shipmentTable.find(shipment => shipment.shipmentNo === parseInt(inputs.shipmentNumber));
        console.log("1: " + selectedShipment.weight + " " + selectedShipment.shipmentNo)

        let shipCargoWeight = 0;


        if (selectedShipment.weight < selectedShip.maxCargoWeight && shipCargo < selectedShip.maxCargoWeight) {
            alert("Succesfully added shipment to Ship");
            shipCargoWeight += selectedShipment.weight;
            console.log("ShipCargo Weight: " + shipCargoWeight);
            setShipCargo(shipCargoWeight);

            fetch("/api/complex/shipmentToShip", { method: 'POST', body: JSON.stringify({ "shipID": parseInt(inputs.shipID), "shipmentNo" : parseInt(inputs.shipmentNumber)}), headers: new Headers({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {

             })
            .catch(err => console.log(err))


        }
        else{
            alert("error: Shipment will exceed max Cargo Weight");
        }

     

       


    }

    function deleteShipmentFromShip(e){
        e.preventDefault();
        fetch("/api/complex/shipmentToShipDelete", { method: 'POST', body: JSON.stringify({ "shipmentNo" : parseInt(inputs.shipmentNumber)}), headers: new Headers({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(data => {

         })
        .catch(err => console.log(err))

    }






    return (

        <div>
            <button onClick={shipmentNumber}>SeeShipmentNo's</button>
            <button onClick={seeShipsOnRoute}>See Ships</button>


            <div className='tableDistance'>
                <div className='tables'>
                    <h1>All Shipments</h1>
                    <table>
                        <thead><tr><th>Shipment Number</th><th>Route Number</th><th>Ship ID</th><th>Weight</th><th>Select Ship</th></tr></thead>
                        <tbody>
                            {shipmentTable.map((shipment, c) => {
                                return (
                                    <ShipmentNo
                                        shipmentNo={shipment.shipmentNo}
                                        routeNo={shipment.routeNo}
                                        shipID={shipment.shipID}
                                        weight={shipment.weight}
                                        setShipmentNumber={setShipmentNo}
                                        setRouteNo={setRouteNo}
                                        key={c}

                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>


                <div className='tables'>
                    <form>
                        <input name='shipmentNumber' type='text' placeholder='Shipment Number' onChange={onChange} value={inputs.shipmentNumber}></input><input name='shipID' type='text' placeholder="Ship ID" onChange={onChange} value={inputs.shipID}></input><button onClick={weightComparison}>Add to Ship</button><button onClick={deleteShipmentFromShip}>Remove Shipment</button>
                    </form>
                    <h1>{routeNo !== 0 ? <div>All Ships on route: {routeNo}</div> : <div>No Routes Selected</div>}</h1>
                    <table>
                        <thead><tr><th>Ship ID</th><th>Ship Name</th><th>Max Cargo Weight</th><th>Captain</th><th>Route No</th><th>Home Port Number</th><th>Max Range</th><th>Speed</th></tr></thead>
                        <tbody>
                            {shipsTable.map((ships, c) => {
                                return (
                                    <Ships
                                        shipID={ships.shipID}
                                        shipName={ships.shipName}
                                        maxCargoWeight={ships.maxCargoWeight}
                                        captain={ships.captain}
                                        routeNo={ships.routeNo}
                                        homePortNo={ships.homePortNo}
                                        maxRange={ships.maxRange}
                                        speed={ships.speed}
                                        key={c}

                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>





        </div>


    )
}

export default CargoWeight;