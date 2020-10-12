//Require all modules needed

let express = require('express');//to create web apps
var exphbs = require('express-handlebars');//to render templates
const bodyParser = require('body-parser');//require body parser for htm functionality
var Greetings = require('./greetings')
var Routes = require('./routes')
const flash = require('express-flash');
const session = require('express-session');



//instantiate 

let app = express();

const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://kagiso:123@localhost:5432/greetings';
const pool = new Pool({
    connectionString
});


const greetings = Greetings(pool)
const routes = Routes(greetings)

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

app.get('/', routes.home)

app.post('/greetings', routes.greeting);

app.get('/greeted', routes.greeted)

app.get('/counter/:user', routes.counter);

app.get('/reset', routes.reset)

//Port setup
const PORT = process.env.PORT || 3008;

app.listen(PORT, function () {
    console.log('App starting on port :' + PORT);
});