const db = require('../models/db');

exports.get_create_test = (req, res, next) => {
    let query = 'select CategoryName from categories';

    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.render('newTest', {
            categories: result,
            where: 'Create Test'
        });
    });

}

exports.create_test = (req, res, next) => {
    let testName = req.body.testName;
    let testCategory = req.body.testCategory;
    let teacherId = req.user[0].id;
    let getCategoryID = 'select ID from categories where CategoryName like ?;';
    let checkIfExists = 'select count(*) as count from tests where testname like ?'
    let insertTest = 'insert into tests (TestName,CategoryID,TeacherID) values (?,?,?);';
    let query = 'select CategoryName from categories';

    db.query(query, (err, categories) => {
        if (err){
            conole.log(err);
            return next(err)
        };   

        db.query(checkIfExists, [testName], (err, exists) => {
            if (err){
                conole.log(err);
                return next(err)
            };

            if (exists[0].count > 0) {
                return res.render('newTest', {
                    categories: categories,
                    where: 'Create Test',
                    message: 'Test already exists'
                });
            }
            db.query(getCategoryID, [testCategory], (err, categoryId) => {
                if (err) throw err;
                db.query(insertTest, [testName, categoryId[0].ID, teacherId], (err, result) => {
                    if (err) throw err;
                    res.redirect('/test/' + testName);

                });

            });
        });
    });
}

exports.create_category = (req, res, next) => {
    let categoryName = req.body.categoryName;
    let insertCategory = 'insert into categories (categoryName) values (?);';
    let checkIfExists = 'select * from categories where categoryName like ?';

    db.query(checkIfExists, [categoryName], (err, exists) => {
        if (err) {
            return res.jsonp({
                success: false,
                message: 'There was some problem with databse'
            })
        };
        if (exists.length > 0) {
            return res.status(409).jsonp({
                success: false,
                message: 'Category already exists'
            });
        }

        db.query(insertCategory, [categoryName], (err, result) => {
            if (err) {
                return res.status(404).jsonp({
                    success: false,
                    message: 'There was some problem with databse'
                })
            }
            return res.jsonp({
                success: true,
                message: 'Category created'
            });

        });


    });


}