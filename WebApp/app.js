
//Environment variables
require('dotenv').config();

//Essential requirments
const express = require('express');
const app = express();

//DB connection
const db = require('./api/models/db');

//Extension packages
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const dateFormat = require('dateformat');

app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Port
const port = process.env.PORT || 5000;

//App
//Routes
const login = require('./api/routes/login');
const registerStudent = require('./api/routes/registerStudent');
const registerTeacher = require('./api/routes/registerTeacher');
const student = require('./api/routes/student');
const createTest = require('./api/routes/createTest');
const desktop = require('./api/routes/desktop');
const test = require('./api/routes/test');
const myTests = require('./api/routes/myTests');
const teacher = require('./api/routes/teacher');

//Session
app.use(session({
    key: 'sessionID',
    secret: 'This is secret',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        //Miliseconds, current 1min
        maxAge: 600000,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//Flash messages
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/', login);
app.use('/registerStudent', registerStudent);
app.use('/registerTeacher', registerTeacher);
app.use('/students', student);
app.use('/createTest', createTest);
app.use('/desktop', desktop);
app.use('/test', test);
app.use('/myTests', myTests);
app.use('/teachers', teacher);

app.use((req,res)=> {
    res.render('errorpage',{
        message:'something went wrong'
    })
})

let hbs = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance. 
    helpers: {
        formatDate: function (date) { return dateFormat(date, "dd.mm.yyyy, HH:MM"); },
        isAdmin: function (user) {
            console.log(user[0].admin);
            return user[0].admin == 1;
        },
        eq: function(v1,v2) {
            return v1 == v2;
        }

    }
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('errorpage', {
        message: 'Something went wrong, try again',
    });
  });

//view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Static path
app.use(express.static(path.join(__dirname + '.../public')));

app.listen(port, () => {
    console.log('SERVER STARTED ON PORT ' + port);
})