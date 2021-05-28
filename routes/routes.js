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
let navBar = [["Login", "/login"], ["SignUp", "/add"]];

exports.index = (req, res) => {
    if(req.cookies.visited) {
        visited = req.cookies.visited;
    }

    res.cookie('visited', new Date(), {maxAge: 99999999999999});
    
    res.render('index', {
        title: 'Charts!',
        visited,
        navBar
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
        title: 'Login',
        navBar
    });
};

exports.loguser = (req, res) => {
    Person.find({"email": req.body.email}, (err, person) => {
        if(err) return console.error(err);
        if (person.length == 0)
            res.redirect('/loginFailed')
        else{
            logVerify(req, res, req.body.password, person[0]);
        }
        
    });
};

exports.loginFailed = (req, res) => {
    res.render('login', {
        title: 'Login',
        failed: 'There is no account with that email or your password is incorrect',
        navBar
    });
};

const logVerify = (req, res, wordpass, chicken) => {
   if(bcrypt.compareSync(wordpass, chicken.password) == true){
       req.session.user = {
           isAuthenticated: true,
           id: chicken.id
       }
       navBar = [["Logout", "/logout"], ["Edit Profile", "/edit/" + chicken.id]];
    res.redirect('/')
   }else{
       res.redirect('/loginFailed')
   }
};

exports.edit = (req, res) => {
    Person.findById(req.params.id, (err, person) => {
        if(err) return console.error(err);
        
        res.render('edit', {
            title: "Edit Page",
            person,
            navBar
        });
    });
};

exports.editedPerson = (req, res) => {
    console.log(req.body.password === '');
    console.log(req.body.hotChocolateFlavor);
    console.log(req.body.reindeerName);
    console.log(req.body.winterActivity);

    Person.findById(req.params.id, (err, person) => {
        if(err) return console.error(err);

        person.username = req.body.username;
        person.age = req.body.age;
        person.answers = [
            req.body.hotChocolateFlavor,
            req.body.reindeerName,
            req.body.winterActivity
        ]


        person.save((err, person) => {
            if (err) return console.error(err);
            console.log(req.body.username + " updated.");
        });
    
    });
    res.redirect('/');
};

exports.add = (req, res) => {
    res.render('create', {
        title: 'Create Account!',
        error: '',
        navBar
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
                req.body.hotChocolateFlavor,
                req.body.reindeerName,
                req.body.winterActivity
            ]
        }));
    });
};

exports.addFailed = (req, res) => {
    res.render('create', {
        title: 'Create Account!',
        error: 'There is already an account with that email address!',
        navBar
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

exports.logout = (req,res) => {
    req.session.destroy(err => {
        if(err) return console.error(err);
        else {
            navBar = [["Login", "/login"], ["SignUp", "/add"]];
            res.redirect('/login');
        }
    })
};