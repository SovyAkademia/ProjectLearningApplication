const db = require('../models/db');

exports.get_create_test = (req,res,next) => {
    let query = 'select CategoryName from categories';

    db.query(query, (err, result) => {
        if (err) throw err;
        res.render('newTest',{
            categories:result,
            where:'Create Test'
        });
        
    });
    
}

exports.create_test = (req,res,next) => {
    let testName = req.body.testName;
    let testCategory = req.body.testCategory;
    let teacherId = req.user[0].id;
    let getCategoryID = 'select ID from categories where CategoryName like ?;';
    let insertTest = 'insert into tests (TestName,CategoryID,TeacherID) values (?,?,?);';

    db.query(getCategoryID,[testCategory],(err,categoryId) => {
        if(err) throw err;
        db.query(insertTest,[testName,categoryId[0].ID,teacherId],(err,result) => {
            if(err) throw err;

            res.redirect('/test/'+testName);

        });

    }); 
}

exports.create_category = (req,res,next) => {
    let categoryName = req.body.categoryName;
    let query = 'insert into categories (categoryName) values (?);';

    db.query(query,[categoryName],(err,result) => {
        if (err) { 
            throw err;      
        }
       res.redirect('/createTest');
    });
}