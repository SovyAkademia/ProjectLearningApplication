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
    // console.log(req.user);
    db.query('select FirstName, LastName from temp_teachers where id like ?',[req.user[0].id], (err,result) => {
        if(err) throw err;
        res.render('dashboard',{
            name:result[0].FirstName,
            lname: result[0].LastName,
            isAdmin:false
        });
    });
}

exports.logout = (req,res,next)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
}


exports.login = (req,res,next)=>{
    let userQuery = 'select count(Email) as Email from temp_teachers where Email like ?';
    let passQuery = 'select count(Password) as num,email from temp_teachers where Email = ? AND Password = ?';
    let getUserId = 'select id from temp_teachers where Email like ?'

    let email = req.body.email;
    let password = req.body.password;

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },(req,res,next)=>{
       
        db.query(userQuery,[email], (err, result) => {
            if (err) throw err;
            if(result[0].Email = 0){
                return next(null,false, {message:'User NOT found'});
            }
        db.query(passQuery,[email,password],(err,res) => {
            if(res[0].num == 1){
                return next(null,res)
            }else{
                return next(null,false,{message:'Wrong password'})
            }
            
        });
      });
    }));
    
    passport.serializeUser((user,done)=>{
        console.log(user);
        done(null,user)
    });
    
    passport.deserializeUser((name,done)=>{
        db.query(getUserId,[name[0].email], (err, user) => {
        done(err,user);
        });
    });

    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/',
        failureFlash: true
    })(req,res,next);
}