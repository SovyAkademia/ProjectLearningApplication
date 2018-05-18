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
    let getStudents = 'select * from students where allowed = 0 order by DateOfReg DESC';
    let getTeachers = 'select * from teachers where allowed = 0 order by DateOfReg DESC';

    db.query(getStudents,(err,students) => {
        if (err) throw err;
        students.map((student) => {
            student.type = 'student';
        });
        db.query(getTeachers,(err,teachers) => {
            if (err) throw err;
            teachers.map((teacher) => {
                teacher.type = 'teacher';
            });

            let users = students.concat(teachers);

            users.sort((a,b) => {
                let c = new Date(a.DateOfReg);
                let d = new Date(b.DateOfReg)
                return d-c;
            });

            res.render('dashboard', {
                users,
                where:'Dashboard'
            });
        });
    });
    // console.log(req.user);
    // db.query('select FirstName, LastName from temp_teachers where id like ?',[req.user[0].id], (err,result) => {
    //     if(err) throw err;
    //     res.render('dashboard',{
    //         name:result[0].FirstName,
    //         lname: result[0].LastName,
    //         isAdmin:false
    //     });
    // });
}

exports.handleRegistration = (req,res,next) => {
    res.jsonp({message:'user handled'});
}

exports.logout = (req,res,next)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
}


exports.login = (req,res,next)=>{
    let userQuery = 'select count(Email) as Email from teachers where Email like ?'; // and allowed like 1
    let passQuery = 'select email, password as pass from teachers where Email = ?';
    let getUserId = 'select id,admin from teachers where Email like ?'; // and allowed like 1

    let email = req.body.email;
    let password = req.body.password;

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },(req,res,next)=>{
       
        db.query(userQuery,[email], (err, result) => {
            if (err) throw err;
            if(result[0].Email == 0){
                return next(null,false, {message:'User NOT found'});
            }
        db.query(passQuery,[email],(err,resu) => {
            if (err) throw err;

            bcrypt.compare(password, resu[0].pass, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    return next(null,resu);
                } else {
                    console.log('wrong password');
                    return next(null,false,{message:'Wrong email or password'});
                }
            });
        });
      });
    }));
    
    passport.serializeUser((user,done)=>{
       // console.log(user);
        done(null,user)
    });
    
    passport.deserializeUser((name,done)=>{
        db.query(getUserId,[name[0].email], (err, user) => {
          //  console.log(user);
        done(err,user);
        });
    });

    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/',
        failureFlash: true
    })(req,res,next);
}