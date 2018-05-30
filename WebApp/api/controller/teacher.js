const db = require('../models/db');
const nodemailer = require('nodemailer');
const generator = require('generate-password');

let mailer = require('../middleware/mailer');


exports.show_all = (req, res, next) => {

    let selectAllQuery = 'select FirstName, LastName, Email from teachers;';

    db.query(selectAllQuery, (err, teacher) => {
        if (err) return next(err);
        res.render('teacher', { teacher, where:'Teachers' });
    });
}

exports.send_invitation = (req, res, next) => {
    let pass = generator.generate({length:6, numbers:true});
    mailer.transporter.sendMail({
        from: '"Nodemailer Contact" <NO-REPLY>', // sender address
        to: req.body.inviteTeacher, // list of receivers
        subject: 'Access to app', // Subject line
        text: 'Password for registration is  '+ pass, // plain text body
        
    }, (err, info) => {
        req.flash('msg','Email has been sent');
        res.redirect('/teachers');
}); 
}