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