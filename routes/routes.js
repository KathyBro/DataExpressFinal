const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://conductor:cocoa@choochoo.kqgkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => { });

let personSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: String,
    answers: Array
});

let Person = mongoose.model('Person_Collection', personSchema);

let salt = bcrypt.genSaltSync(10);

exports.index = (req, res) => {
    res.render('index', {
        title: 'Charts!'
    })
};

exports.api = (req, res) => {
    Person.find((err, person) => {
        if (err) return console.error(err);
        res.json(person);
    });
};

exports.edit = (req, res) => {
    req.query.id;
    res.render('edit', {
        title: "Edit Page"
    });
};
exports.editPerson = (req, res) => {

};

exports.add = (req, res) => {
    res.render('create', {
        title: 'Create Account!',
        error: ''
    });
};

exports.addPerson = (req, res) => {
    Person.find({ "email": req.body.email }, (err, person) => {
        if (err) return console.error(err);
        emailVerify(req, res, person.length, new Person({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, salt),
            email: req.body.email,
            age: req.body.age,
            answers: [
                req.body.hotChocolateFlavor.value,
                req.body.reindeerName.value,
                req.body.winterActivity.value
            ]
        }));
    });
};

exports.addFailed = (req, res) => {
    res.render('create', {
        title: 'Create Account!',
        error: 'There is already an account with that email address!'
    });
};

let emailVerify = (req, res, found, person) => {
    if (!found) {
        person.save((err, person) => {
            if (err) return console.error(err);
            console.log(req.body.username + ' was created.');
        });
        res.redirect('/');
    }
    else {
        res.redirect('/addFailed');
    }
};