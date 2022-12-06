import React, { useEffect, useState } from "react";

function PopularPorts() {

    const [inputs, setInputs] = useState({});
    const [search, setSearch] = useState();
    const [start, setStart] = useState(false);
    const [end, setEnd] = useState(false);
    const [startingPort, setStartingPort] = useState([]);
    const [endingPort, setEndingPort] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(inputs.country);
        setStart(false);
        setEnd(false);
        fetch("/api/complex/mostCommonStartingPort?country=" + inputs.country, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => {
                return res.json().then(data => {
                    if (res.ok) {
                        setStartingPort(data);
                        setStart(true);
                    }
                    else {
                        throw new Error(res.status + "\n" + JSON.stringify(data));
                    }
                })
            })
            .catch(err => {
                alert(err);
            });

        fetch("/api/complex/mostCommonEndingPort?country=" + inputs.country, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => {
                return res.json().then(data => {
                    if (res.ok) {
                        setEndingPort(data);
                        setEnd(true);
                    }
                    else {
                        throw new Error(res.status + "\n" + JSON.stringify(data));
                    }
                })
            })
            .catch(err => {
                alert(err);
            });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <React.Fragment>
            <h1>Most popular starting and ending ports for a country</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="country" onChange={handleChange} placeholder="Enter full country name" value={inputs.country || ""} />
            </form>
            {start ? <p>Most popular starting port for shipments from {search} is  {startingPort[0].portName} with port number {startingPort[0].portNo} from region {startingPort[0].region}</p> : null}
            {end ? <p>Most popular ending port for shipments from {search} is  {endingPort[0].portName} with port number {endingPort[0].portNo} from region {endingPort[0].region}</p> : null}
        </React.Fragment>
    )
}

export default PopularPorts;