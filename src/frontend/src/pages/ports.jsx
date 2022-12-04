import React from 'react';
import { useEffect, useState } from 'react';
import Port from '../components/port/port';
import PortInsertPopup from '../components/port/portInsertPopup';

function PortsPage() {

    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState([]);
    const [buttonState, setButtonState] = useState(false);

    useEffect(() => {
        fetch("/api/ports", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => {
                return res.json().then(data => {
                    if (res.ok) {
                        setResults(data);
                    }
                    else {
                        throw new Error(res.status + "\n" + JSON.stringify(data));
                    }
                })
            })
            .catch(err => {
                alert(err);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("/api/ports/primaryKey?portNo=" + inputs.portNo, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => {
                return res.json().then(data => {
                    if (res.ok) {
                        setResults(data);
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

    const insertPortButton = () => {
        setButtonState(!buttonState);
    }

    return (
        <React.Fragment>
            <h1>Ports Page</h1>
            <button onClick={insertPortButton}>Add Port</button>
            <form onSubmit={handleSubmit}>
                <input type="text" name="portNo" onChange={handleChange} placeholder="Port Number" value={inputs.portNo || ""} />
            </form>
            <table>
                <tr>
                    <th>Port Number</th>
                    <th>Region</th>
                    <th>Port Name</th>
                    <th>Country</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Edit Table</th>
                </tr>
                {results.length !== 0 ? results.map((port, c) => <Port {...port} key={c} />) : null}
                {buttonState ? <PortInsertPopup buttonState={setButtonState} /> : null}
            </table>
        </React.Fragment>
    );
}

export default PortsPage;