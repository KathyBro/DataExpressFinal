const express = require("express");
const pug = require("pug");
const routes = require("./routes/routes");
const path = require("path");
const { url } = require('inspector');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const { urlencoded } = require("express");

const app = express();

const urlencodedParser = express.urlencoded({ extended: false });

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', routes.index);
app.get('/api', urlencodedParser, routes.api);
app.get('/edit/:id', routes.edit);
app.post('/edit/:id', urlencodedParser, routes.editPerson);
app.post('/add', urlencodedPa)

app.listen(3000);