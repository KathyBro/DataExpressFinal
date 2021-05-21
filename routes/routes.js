const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/data', {
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
}); //Store the answers as an array with three values stored

let Person = mongoose.model('Person_Collection', personSchema);

let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync('cocoa', salt);

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