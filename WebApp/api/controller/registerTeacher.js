const db = require('../models/db');

exports.get_teacher_reg_form = (req,res,next) => {
    res.render('registerTeacher');
}

exports.register_new_teacher = (req,res,next) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    let selectEmail = 'select Email from temp_teachers where Email like ?';
    let insertTeacher = 'insert into temp_teachers(FirstName,LastName,Email,Password) values(?,?,?,?)';

    db.query(selectEmail,[email], (err, result) => {
        if (err) throw err;
        //validate input with validator,check if passwords match
        //x check if email already exists
        if(result.length < 1 ){
            //hash password with bcrypt
            //x store student in temp_students table
            db.query(insertTeacher,[firstName,lastName,email,password],(err,inserted) => {
                if(err) throw err;
                console.log('Teacher registered');
                console.log(inserted);
                res.render('login');

            });

        } else {
            res.render('registerTeacher', {message: 'email already exists'})
            console.log('Student already exists');
        }
    });
    
    
}