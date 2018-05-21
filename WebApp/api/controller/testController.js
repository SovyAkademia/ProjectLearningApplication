const db = require('../models/db');

exports.get_test_creator = (req, res, next) => {
    let queryCategoryTest = 'SELECT TestName, CategoryName FROM tests ' +
        'INNER JOIN categories ON tests.CategoryID=categories.ID WHERE tests.testname like ?;';

    let queryQuestions = 'SELECT questions.ID,QuestionText,ans1,ans2,ans3,ans4 FROM questions ' +
        'INNER JOIN test_details ON test_details.QuestionID=questions.ID ' +
        'INNER JOIN tests ON test_details.TestID=tests.ID ' +
        'INNER JOIN answers_view on questions.id=answers_view.IDQuestion '+
        'INNER JOIN categories ON tests.CategoryID=categories.ID WHERE tests.TestName like ?;';

    let queryQuestionAnswers = 'SELECT QuestionText, TestName,CategoryName, AnswerText FROM questions ' +
        'INNER JOIN test_details ON test_details.QuestionID=questions.ID ' +
        'INNER JOIN tests ON test_details.TestID=tests.ID ' +
        'INNER JOIN categories ON tests.CategoryID=categories.ID ' +
        'INNER JOIN answers on questions.id = answers.QuestionID WHERE tests.TestName like ?';
    let name = req.params.name;

    db.query(queryCategoryTest, [name], (err, result) => {
        if (err) throw err;
        db.query(queryQuestions, [name], (err, questions) => {
    //     console.log(questions);
            if (err) throw err;
                if (questions != null) {
                    res.render('test', {
                        TestName: result[0].TestName,
                        CategoryName: result[0].CategoryName,
                        questions,
                    })
                } else {
                    res.render('test', {
                        TestName: result[0].TestName,
                        CategoryName: result[0].CategoryName
                    })   
                }
        })
    });
}

exports.edit_question = (req,res,next) =>{
    console.log(req.params.id);
}