const express = require("express");
const pug = require("pug");
const routes = require("./routes/routes");
const path = require("path");
const { url } = require('inspector');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

const urlencodedParser = express.urlencoded({ extended: false });

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', routes.index);
app.get('/api', urlencodedParser, routes.api);
app.get('/login', routes.login)
app.post('/login', urlencodedParser, routes.loguser)

app.listen(3000);