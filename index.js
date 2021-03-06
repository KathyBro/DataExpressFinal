const express = require("express");
const pug = require("pug");
const routes = require("./routes/routes");
const path = require("path");
const { url } = require('inspector');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const { urlencoded } = require("express");

const app = express();

app.use('/favicon.ico', express.static(path.join(__dirname, '/public/Media/favicon.ico')));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));
app.use(expressSession({
    secret: 't1ngT1ng7*ng',
    saveUninitialized: true,
    resave: true
}));
app.use(cookieParser('G1NgyM@n'));

const urlencodedParser = express.urlencoded({ extended: false });

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        next();
    }
    else {
        res.redirect('/login');
    }
};


app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', routes.index);
app.get('/api', urlencodedParser, routes.api);
app.get('/login', routes.login);
app.post('/login', urlencodedParser, routes.loguser);
app.get('/loginFailed', routes.loginFailed)
app.get('/add', routes.add);
app.post('/add', urlencodedParser, routes.addPerson);
app.get('/addFailed', routes.addFailed);
app.get('/logout', routes.logout);
app.get('/edit/:id', checkAuth, routes.edit);
app.post('/edit/:id', checkAuth, urlencodedParser, routes.editedPerson);

app.listen(3000);