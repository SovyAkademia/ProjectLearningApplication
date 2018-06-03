const db = require('../models/db');
const nodemailer = require('nodemailer');
const generator = require('generate-password');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');


let mailer = require('../middleware/mailer');


exports.show_all = (req, res, next) => {

    let selectAllQuery = 'select ID,FirstName, LastName, Email from teachers;';
    let testCounter = 'select count(testname) as count from tests where teacherid like ?;';

    db.query(selectAllQuery, (err, teacher) => {
        if (err) return next(err);
        res.render('teacher', { teacher, where:'Teachers' });
    });
}

exports.send_invitation = (req, res, next) => {
    console.log(req.body);
    let pass = generator.generate({length:6, numbers:true});

    let queryInsert = 'insert into teachers (FirstName, LastName, Email, Password, DateOfReg) '+
    'values (?,?,?,?,now());';

    bcrypt.hash(pass,10, (err,hash)=>{
        db.query(queryInsert,[req.body.firstName,req.body.lastName,req.body.email,hash],(err,result)=>{
            if (err) return next(err);
            mailer.transporter.sendMail({
                from: '"Nodemailer Contact" <NO-REPLY>', // sender address
                to: req.body.email, // list of receivers
                subject: 'Access to app', // Subject line
                text: 'Welcome '+req.body.firstName+" "+req.body.lastName+"\n"+
                "Your password is "+pass, // plain text body                
            }, (err, info) => {
                req.flash('msg','Email has been sent');
                res.redirect('/teachers');
            });
        });
    });     
}

exports.archive_teacher = (req, res, next)=>{
    let id = req.params.id;
    console.log(req.params.id);

    let findTeacher = 'select FirstName, LastName,Email from teachers where id like ?;';
    let archiveQuery = 'insert into teachers_history (FirstName,LastName,Email,DateOfDelete) '+
    'values (?,?,?,now());';
    let deleteQuery = 'delete from teachers where id like ?;';

    db.query(findTeacher,[id],(err,teacher)=>{
        if (err) return next(err);
        console.log(teacher);
        db.query(archiveQuery,[teacher[0].FirstName,teacher[0].LastName,teacher[0].Email],(err,result)=>{
            if (err) return next(err);
            db.query(deleteQuery,[id],(err,deleteTeacher)=>{
                if (err) return next(err);
                req.flash('error_msg', 'Teacher archived');
                res.redirect('/teachers');
            });
        });
    });
}

exports.delete_teacher = (req, res, next) => {
    let id = req.params.id;

    let deleteQuery = 'delete from teachers where id like ?;';

    db.query(deleteQuery,[id],(err,result)=>{
        if (err) return next(err);
                req.flash('error_msg', 'Teacher deleted');
                res.redirect('/teachers');
    });
}

exports.make_admin = (req,res,next) => {
    let id = req.params.id;

    let setAdmin = 'update teachers set admin = ? where id = ?';

    db.query(setAdmin,[1,id],(err,updated) => {
        if (err) return next(err);
        req.flash('error_msg', 'Teacher updated to admin');
            res.redirect('/teachers');
    })
}