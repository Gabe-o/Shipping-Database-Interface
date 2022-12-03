const express = require('express');
const cors = require("cors");

const clientsRouter = require("./routes/clientsRouter");
const productsRouter = require("./routes/productsRouter");
const shipmentsRouter = require("./routes/shipmentsRouter");
const productDetailsRouter = require("./routes/productDetailsRouter");
const shipmentDatesRouter = require("./routes/shipmentDatesRouter");
const routesRouter = require("./routes/routesRouter");
const portsRouter = require("./routes/portsRouter");
const shipsRouter = require("./routes/shipsRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => { // for all routes
    console.log('Request: ', req.method, ' \tPath: ', req.url);
    next(); // keep going
});

app.use("/api/clients", clientsRouter);
app.use("/api/products", productsRouter);
app.use("/api/shipments", shipmentsRouter);
app.use("/api/shipmentProductInformation", productDetailsRouter);
app.use("/api/shipmentDates", shipmentDatesRouter);
app.use("/api/routes", routesRouter);
app.use("/api/ports", portsRouter);
app.use("/api/ships", shipsRouter);

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});