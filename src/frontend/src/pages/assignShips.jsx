import React from 'react';
import { useEffect, useState } from 'react';

function CargoWeight() {

    const [inputs, setInputs] = useState({});
    const [shipmentNo, setShipmentNo] = useState(0);
    const [shipmentWeights, setShipmentWeights] = useState(0);

    const onChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    

    function shipMaxWeight(){
    //max cargoWeight and ship ID's from ships table
    fetch("/api/ships/shipMaxWeight", { method: 'GET',  headers: new Headers({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(data => {
            console.log(JSON.stringify(data));
          



        })
        .catch(err => console.log(err))
    }

        function shipmentNumber(){

        
        //get all shipment numbers
        fetch("/api/shipments/shipmentNumber" , { method: 'GET',  headers: new Headers({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(data => {
            
            console.log(data)

          



        })
        .catch(err => console.log(err))
    }

    function setShipmentNumber(){
        let shipmentNumber = parseInt(inputs.shipmentNo)
        setShipmentNo(shipmentNumber);
    }



    function shipmentWeight(){
        //weight of a shipment based on a shipmentNo
    fetch("/api/complex/shipWeight?shipmentNo=" + shipmentNo, { method: 'GET',  headers: new Headers({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }) })
        .then(res => res.json())
        .then(data => {
            JSON.stringify(data);
            console.log( "shipmentNo: " +shipmentNo + " - shipments Weight: " + data);
          



        })
        .catch(err => console.log(err))
    }



    return (

        <div>
            <form>
                <input type='text' name='shipmentNo' onChange={onChange} value={inputs.shipmentNo} placeholder='type a shipmentNo'></input>
            </form>
            <button onClick={shipmentNumber}>SeeShipmentNo's</button>
            <button onClick={shipMaxWeight}>Weight of a ship</button>
            <button onClick={shipmentWeight}>Weight of a shipment</button>
            <button onClick={setShipmentNumber}>setShipmentNumber</button>





        </div>


    )
}

export default CargoWeight;