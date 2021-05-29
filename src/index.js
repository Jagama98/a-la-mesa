const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const { Mongoose } = require('mongoose');

//Inicializaciones
const app = express();
require('./database');
require('./config/passport');

//Conexiones Servidor
mongoose.connect('mongodb+srv://a-la-mesa.0omuj.mongodb.net/myFirstDatabase')
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.log(err));

//Ajustes
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    defaultLayout: path.join(app.get('views') , 'main.hbs'),
    partialsDir: path.join(app.get('views') , 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp', 
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variables Globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/pedidos'));
app.use(require('./routes/restaurantes'));
app.use(require('./routes/mapa'));
app.use(require('./routes/users'));


//Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Server is listenning
app.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port'));
});
