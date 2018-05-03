const db = require('../models/db');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');

exports.index_get = (req,res,next)=>{
    res.render('login');
}

exports.dashboard = (req,res,next)=>{
    res.render('dashboard');
}

exports.logout = (req,res,next)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
}

exports.login = (req,res,next)=>{
    let userQuery = 'select count(FirstName) as name from temp_students where FirstName like ?';
    let passQuery = 'select count(Password) as num from temp_students where FirstName = ? AND Password = ?';

    const username = req.body.username;
    const password = req.body.password;

    passport.use(new LocalStrategy((req,res,next)=>{
       
        db.query(userQuery,[username], (err, result) => {
            if (err) throw err;
            if(result[0].name != 1){
                return next(null,false, {message:'User NOT found'});
            }
        db.query(passQuery,[username,password],(err,res) => {
            if(res[0].num == 1){
                return next(null,result)
            }else{
                return next(null,false,{message:'Wrong password'})
            }
            
        });
        })
    }));
    
    passport.serializeUser((user,done)=>{
        done(null,user)
    });
    
    passport.deserializeUser((name,done)=>{
        db.query(userQuery,[username], (err, user) => {
        done(err,user);
    });
    });

    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/',
        failureFlash: true
    })(req,res,next);
}