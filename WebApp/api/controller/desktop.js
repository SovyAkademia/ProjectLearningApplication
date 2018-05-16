const db = require('../models/db');

exports.get_categories = (req, res, next) => {

    let query = 'select name from categories';

    db.query(query, (err, result) => {
        if (err) { throw err };
        res.json({
            categories: result
        })

    });

}

exports.get_tests = (req, res, next) => {

    let category = req.params.category;

    let getCategoryId = 'select id from categories where Name like ?';
    let getTests = 'select * from tests where CategoryID = ?';

    db.query(getCategoryId, [category], (err, categoryId) => {
        if (err) throw err;

        db.query(getTests, [categoryId[0].id], (err, tests) => {
            if (err) throw err;
            res.json({
                tests
            })
        });
    });
}

exports.get_test_info = (req,res,next) => {
    let testId = req.params.id;
    let query = 'select Count(testID) as num from test_details where testID = ?';

    db.query(query,[testId],(err,questions) => {
        if (err) throw err;

        res.json({
            Questions:questions
        })
    });
}