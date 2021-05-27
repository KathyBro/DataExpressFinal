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

let visited = new Date();

exports.index = (req, res) => {
    if(req.cookies.visited) {
        visited = req.cookies.visited;
    }
    
    res.cookie('visited', new Date(), {maxAge: 99999999999999});
    
    res.render('index', {
        title: 'Charts!',
        visited
    })
};

exports.api = (req, res) => {
    Person.find((err, person) => {
        if (err) return console.error(err);
        res.json(person);
    });
};

exports.login = (req, res) => {
    res.render('login', {
        title: 'Login'
    });
};

exports.loguser = (req, res) => {
    // need create user first to hash their password
    res.redirect('/');
}
exports.edit = (req, res) => {
    Person.findById(req.params.id, (err, person) => {
        if(err) return console.error(err);
        
        res.render('edit', {
            title: "Edit Page",
            person
        });
    });
};

exports.editedPerson = (req, res) => {
    console.log(req.body.hotChocolateFlavor);
    console.log(req.body.reindeerName);
    console.log(req.body.winterActivity);

    // Person.findById(req.params.id, (err, person) => {
    //     if(err) return console.error(err);

    //     person.username = req.body.username;
    //     person.password = req.body.password;
    //     person.email = req.body.email;
    //     person.age = req.body.age;
    //     person.answers[0] = req.body.hotChocolateFlavor.selected;
    //     person.answers[1] = req.body.reindeerName.selected;
    //     person.answers[2] = req.body.winterActivity.selected;


    //     person.save((err, person) => {
    //         if (err) return console.error(err);
    //         console.log(req.body.name + " updated.");
    //     });
    
        res.redirect('/');
    };

exports.add = (req, res) => {
    res.render('create', {
        title: 'Create Account!',
        error: ''
    });
};

exports.addPerson = (req, res) => {
    let person = new Person({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, salt),
            email: req.body.email,
            age: req.body.age,
            answers: [
                req.body.hotChocolateFlavor.value,
                req.body.reindeerName.value,
                req.body.winterActivity.value
            ]
        });
        person.save((err, person) => {
            if (err) return console.error(err);
            console.log(req.body.username + ' was created.');
        });
        res.redirect('/');
};

exports.addFailed = (req, res) => {
    res.render('create', {
        title: 'Create Account!',
        error: 'There is already an account with that email address!'
    });
};

let emailVerify = (req, res, found, person) => {
    if (found == 0) {
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