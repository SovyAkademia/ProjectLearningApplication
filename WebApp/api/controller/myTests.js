const db = require('../models/db');

exports.get_all_tests = (req,res,next) => {
    let getTests = 'select tests.testName,tests.id,Categories.categoryname,categories.id from tests inner join categories on tests.categoryid = categories.id where teacherid like ?;';

    db.query(getTests,[req.user[0].id],(err,result) => {
        if(err){
            return res.render('myTests',{
                error:err
            })
        }
        console.log(result);
        res.render('myTests',{
            test:result,
            where:'My Tests'
        });
    });
}