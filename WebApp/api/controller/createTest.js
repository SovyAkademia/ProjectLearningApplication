const db = require('../models/db');

exports.get_create_test = (req,res,next) => {
    let query = 'select name from categories';

    db.query(query, (err, result) => {
        if (err) throw err;

        res.render('newTest',{
            categories:result
        });
        
    });
    
}

exports.create_test = (req,res,next) => {
    let testName = req.body.testName;
    let testCategory = req.body.testCategory;
    let teacherId = req.body.teacherId;

    let getCategoryID = 'select id from categories where Name like ?;';
    let insertTest = 'insert into tests (Name,CategoryID,TeacherID) values(?,?,?);';

    db.query(getCategoryID,[testCategory],(err,categoryId) => {
        if(err) throw err;
        db.query(insertTest,[testName,categoryId[0].id,teacherId],(err,result) => {
            if(err) throw err;
            res.json({
                message:"test created"
            });
        });

    });
}