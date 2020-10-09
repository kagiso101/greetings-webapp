//Require all modules needed

let express = require('express');//to create web apps
var exphbs = require('express-handlebars');//to render templates
const bodyParser = require('body-parser');//require body parser for htm functionality
var Greetings = require('./greetings')
const flash = require('express-flash');
const session = require('express-session');




//instantiate 

let app = express();
var greetings = Greetings()

//setup handlebars ,Body-parser and public
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));


// initialise session middleware - flash-express depends on it
app.use(session({
    secret: 'my express flash string',
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.use(express.static('public'));//to use css
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Routes

app.get('/', function (req, res) {

    //  const greetedNames = await greetings.getNames()

    res.render('home');
})

app.post('/greetings', async function (req, res) {

    var theName = req.body.nameInput
    var language = req.body.selector

    if (theName === '' && language === undefined) {
        req.flash('error', 'please enter a name & select a language!')
    }
    else if (theName === '') {
        req.flash('error', 'please enter a name!')
    }
    else if (language === undefined) {
        req.flash('error', 'Please select a language')
    }

    var greetUser = await greetings.greetUser(theName, language)
    await greetings.verifyName(theName)
    var greetCounter = await greetings.greetCount()

    res.render("home", {
        greetDisplay: greetUser,
        counter: greetCounter
    })
});

app.get('/greeted', async function (req, res) {
    const users = greetings.allUsers()
    res.render('greeted', {
        allUsers: await users
    })
})

app.get('/counter/:user', async function (req, res) {
    var user = req.params.user
    var times = await greetings.perPerson(user)
    res.render('times', {
        name: user,
        counter: times
    })
});

app.get('/reset', async function (req, res) {
    const reset = greetings.reset()
    res.render('home')
})

//Port setup
const PORT = process.env.PORT || 3008;

app.listen(PORT, function () {
    console.log('App starting on port :' + PORT);
});