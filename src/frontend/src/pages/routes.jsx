import React from 'react';
import { useEffect, useState } from 'react';
import Route from '../components/route/route';
import RouteInsertPopup from '../components/route/routeInsertPopup';

function RoutesPage() {

    const [inputs, setInputs] = useState({});
    const [results, setResults] = useState([]);
    const [buttonState, setButtonState] = useState(false);

    useEffect(() => {
        fetch("/api/routes", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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

        fetch("/api/routes/primaryKey?routeNo=" + inputs.routeNo, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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

    const insertRouteButton = () => {
        setButtonState(!buttonState);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <React.Fragment>
            <h1>Routes Page</h1>
            <button onClick={insertRouteButton}>Add Route</button>
            <form onSubmit={handleSubmit}>
                <input type="text" name="routeNo" onChange={handleChange} placeholder="Route Number" value={inputs.routeNo || ""} />
            </form>
            <table>
                <tr>
                    <th>Route Number</th>
                    <th>Starting Port Number</th>
                    <th>Ending Port Number</th>
                    <th>Distance (km)</th>
                    <th>Edit Table</th>
                </tr>
                {results.length !== 0 ? results.map((route, c) => <Route {...route} key={c} />) : null}
                {buttonState ? <RouteInsertPopup buttonState={setButtonState} /> : null}
            </table>
        </React.Fragment>
    );
}

export default RoutesPage;