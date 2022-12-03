const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => { // for all routes
    console.log('Request: ', req.method, ' \tPath: ', req.url);
    next(); // keep going
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});