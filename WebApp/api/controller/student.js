const db = require('../models/db');

exports.show_all = (req,res,next) => {
        // console.log(req.user);
        db.query('select FirstName, LastName from students;',(err,result) => {
            if(err) throw err;
            res.render('students',{
                result:result
            });
        });

}

exports.show_all_java = (req,res,next)=>{
    db.query('select FirstName, LastName, Email  from students;',(err,result) => {
        if(err) throw err;
        res.send({
            result:result/*
            name:result[0].FirstName,
            lname: result[0].LastName,
            isAdmin:false
            */
        });
    });

}