const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const routes = require('./routes');
app.use(routes);

app.listen(5000, () => {
    console.log("Porta 5000 on ");
})