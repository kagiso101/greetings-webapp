//Require all modules needed

let express = require('express');//to create web apps
var exphbs = require('express-handlebars');//to render templates
const bodyParser = require('body-parser');//require body parser for htm functionality
var Greetings = require('./greetings')

//instantiate 

let app = express();
var greetings = Greetings()

//setup handlebars ,Body-parser and public
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));

app.use(express.static('public'));//to use css
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Routes

app.get('/', function (req, res) {
    res.render('home')
})

app.post('/greetings', function (req, res) {
    greetings.greetUser(req.body.nameInput)

    var theName = req.body.nameInput
    var language = req.body.selector

    var greetUser = greetings.greetUser(theName, language)

    res.render("home", {
        greetDisplay: greetUser
    })
    console.log(greetUser)
    
});


//Port setup
const PORT = process.env.PORT || 3008;

app.listen(PORT, function () {
    console.log('App starting on port' + PORT);
});