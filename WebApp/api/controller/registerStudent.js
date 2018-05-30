const db = require('../models/db');
const bcrypt = require('bcrypt');

exports.get_student_reg_form = (req, res, next) => {
    res.render('registerStudent');
}

exports.register_new_student = (req, res, next) => {
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let firstYear = req.body.firstYear;
    console.log(req.body);

    let selectEmail = 'select Email from students where Email like ?';
    let insertStudent = 'insert into students (FirstName,LastName,Email,Year,DateOfReg) values(?,?,?,?,CURRENT_TIMESTAMP())';

    db.query(selectEmail, [email], (err, result) => {
        if (err) return next(err);
        
        if (result.length == 0) {
            if (err) return next(err);
            db.query(insertStudent, [firstName, lastName, email, firstYear], (err, inserted) => {
                if (err) return next(err);
                console.log('ok');
                console.log('Student registered');
                res.render('login', { message: 'Student succesfully registered' });
            });
        } else {
            res.render('registerStudent', { message: 'Student already exists' })
            console.log('Student already exists');
        }
    });
}