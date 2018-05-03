
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
//const teacher = require('./api/routes/teacher');
//const student = require('./api/routes/student');

//Session
app.use(session({
    key:'sessionID',
    secret:'This is secret',
    resave:true,
    rolling:true,
    saveUninitialized:false,
    cookie:{
        //Miliseconds, current 1min
        maxAge:100000,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

//Flash messages
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/',login);
app.use('/registerStudent', registerStudent);
app.use('/registerTeacher', registerTeacher);
//app.use('/regteacher', teacher);


//view engine
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//Static path
app.use(express.static(path.join(__dirname+'.../public')));

//Global var for user
/*
app.use((req,res,next)=>{
    
    next();
});
*/



app.listen(port, () => {
    console.log('SERVER STARTED ON PORT '+port);
})