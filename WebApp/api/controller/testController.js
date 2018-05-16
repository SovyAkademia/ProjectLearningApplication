const db = require('../models/db');

exports.get_test_creator = (req, res, next) => {
    let query = 'SELECT QuestionText, TestName,CategoryName FROM questions '+
    'INNER JOIN test_details ON test_details.QuestionID=questions.ID '+ 
    'INNER JOIN tests ON test_details.TestID=tests.ID '+ 
    'INNER JOIN categories ON tests.CategoryID=categories.ID WHERE tests.TestName = ?'

    let queryCategoryTest = 'SELECT TestName, CategoryName FROM tests '+
    'INNER JOIN categories ON tests.CategoryID=categories.ID WHERE tests.testname like ?;';
    let name = req.params.name;

    db.query(queryCategoryTest, [name], (err, result) => {
        if (err) throw err;
        res.render('test', {
            TestName:result[0].TestName,
            CategoryName:result[0].CategoryName
        });


    });

}

exports.add_question = (req, res, next) => {
    let name = req.params.name;
    console.log(name);

    let question = req.body;
    console.log(question);
    
}