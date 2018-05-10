const db = require('../models/db');
const bcrypt = require('bcrypt');

exports.get_teacher_reg_form = (req,res,next) => {
    res.render('registerTeacher');
}

exports.register_new_teacher = (req,res,next) => {
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let password = req.body.password;

    let selectEmail = 'select Email from teachers where Email like ?'; //and allowed like 1
    let insertTeacher = 'insert into teachers(FirstName,LastName,Email,Password,DateOfReg) values(?,?,?,?,CURRENT_TIMESTAMP())';

    db.query(selectEmail,[email], (err, result) => {

        if (err) throw err;
        if(result.length == 0 ){
            bcrypt.hash(password,10, (err,hash) => {
                if(err) throw err;
                db.query(insertTeacher,[firstName,lastName,email,hash],(err,inserted) => {
                    if(err) throw err;
                    console.log('Teacher registered');
                    res.render('login', {message:'Teacher succesfully registered'});
                });
            });

        } else {
            res.render('registerTeacher', {message: 'Teacher already exists'})
            console.log('Student already exists');
        }
    });
    
    
}