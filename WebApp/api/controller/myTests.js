const db = require('../models/db');

exports.get_all_tests = (req, res, next) => {
    let getTests = "SELECT tests.ID AS 'TestID',TestName,categories.ID AS categoryID ,categoryname FROM tests INNER JOIN teachers ON tests.TeacherID=teachers.ID INNER JOIN categories ON tests.CategoryID=categories.ID WHERE teachers.ID=?;";
    let getCategories = 'select * from categories';
    db.query(getTests, [req.user[0].id], (err, test) => {
        console.log(test);
        if (err) {
           return res.render('myTests', {
                error: err
            });
        }
        db.query(getCategories, (err, categories) => {
            if (err) {
                res.render('myTests', {
                    error: err
                });
            }
            res.render('myTests', {
                test,
                categories,
                where: 'My Tests'
            });

        });


    });
}

exports.get_all_tests_in_category = (req, res, next) => {
    let categoryId = req.body.options;
    let getTests = 'select tests.TestName,tests.id as "TestID",Categories.categoryname,categories.id as categoryID from tests inner join categories on tests.categoryid = categories.id where categoryid like ? and teacherid like ?;';
    let getCategories = 'select * from categories';

    if(categoryId == 'all'){
        return res.redirect('/myTests');
    }

    db.query(getTests, [categoryId, req.user[0].id], (err, test) => {
        if (err) {
            return res.render('myTests', {
                error: err
            });
        }
        db.query(getCategories, (err, categories) => {
            if (err) {
                return res.render('myTests', {
                    error: err
                });
            }
            console.log(test,categories);
            res.render('myTests', {
                test,
                categories,
                categoryId,
                where: 'My Tests'
            });
        });
    });
}