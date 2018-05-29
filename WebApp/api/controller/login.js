const db = require('../models/db');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const generator = require('generate-password');

const mailer = require('../middleware/mailer');

exports.index_get = (req, res, next) => {
    res.render('login');
}

exports.dashboard = (req, res, next) => {
    let getStudents = 'select * from students where allowed = 0 order by DateOfReg DESC';
    let getTeachers = 'select * from teachers where allowed = 0 order by DateOfReg DESC';

    db.query(getStudents, (err, students) => {
        if (err) return next(err);
        students.map((student) => {
            student.type = 'student';
        });
        let users = students;
        users.sort((a, b) => {
            let c = new Date(a.DateOfReg);
            let d = new Date(b.DateOfReg)
            return d - c;
        });
      //  console.log(users);
        res.render('dashboard', {
            users,
            where: 'Dashboard'
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

exports.handleRegistration = (req, res, next) => {
    res.jsonp({ message: 'user handled' });
}

exports.logout = (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
}


exports.login = (req, res, next) => {
    let userQuery = 'select count(Email) as Email from teachers where Email like ?'; // and allowed like 1
    let passQuery = 'select email, password as pass from teachers where Email = ?';
    let getUserId = 'select id,admin from teachers where Email like ?'; // and allowed like 1

    let email = req.body.email;
    let password = req.body.password;

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (req, res, next) => {

        db.query(userQuery, [email], (err, result) => {
            if (err) return next(err);
            if (result[0].Email == 0) {
                return next(null, false, { message: 'User not found' });
            }
            db.query(passQuery, [email], (err, resu) => {
                if (err) return next(err);

                bcrypt.compare(password, resu[0].pass, (err, isMatch) => {
                    if (err) return next(err);
                    if (isMatch) {
                        return next(null, resu);
                    } else {
                        console.log('wrong password');
                        return next(null, false, { message: 'Wrong password' });
                    }
                });
            });
        });
    }));

    passport.serializeUser((user, done) => {
        // console.log(user);
        done(null, user)
    });

    passport.deserializeUser((name, done) => {
        db.query(getUserId, [name[0].email], (err, user) => {
            //  console.log(user);
            done(err, user);
        });
    });

    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
}

exports.send_mail = (req,res,next) =>{
    let reqid = req.params.id;
    console.log(reqid);
    let pass = generator.generate({length:6, numbers:true});
    let queryFind = 'select FirstName,LastName, Email from students where ID like ?;';
    let queryInsertGenPass = 'update students set Password = ?, Allowed = 1 where ID like ?;';
    
    db.query(queryFind,[reqid], (err,result) => {
        if (err) return next(err);
        db.query(queryInsertGenPass,[pass,reqid],(err,insertPass)=>{
            if (err) return next(err);
            mailer.transporter.sendMail({
                from: '"Nodemailer Contact" <NO-REPLY>', // sender address
                to: result[0].Email, // list of receivers
                subject: 'Access to app', // Subject line
                text: 'Hello there '+result[0].FirstName+''+result[0].LastName+' your password is '+ pass, // plain text body
            }, (error, info) => {
                if (error) {
                    req.flash('error_msg','error');
                    res.redirect('/dashboard');
                }else{
                    req.flash('msg','success');
                    res.redirect('/dashboard');
                }                    
            });
            });
        });
}

exports.decline_user = (req ,res, next) =>{
    let reqid = req.params.id;

    let deleteQuery = 'delete from students where id like ?;';

    db.query(deleteQuery,[reqid],(err,insertPass)=>{
        if (err) return next(err);

        req.flash('error_msg', 'User deleted');               
        res.redirect('/dashboard');
    });

}