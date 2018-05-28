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
        if (err){
            return res.render('createTest', {
                error: err
            });
        };
        db.query(queryQuestions, [name], (err, questions) => {
    //     console.log(questions);
            if (err) return next(err);
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

exports.show_edit_modal = (req,res,next) => {
    let questionID = req.params.id;
    let query = 'select questiontext,points from questions where id = ?';
    let query2 = 'select answertext,correct from answers where questionid = ?';

    db.query(query,[questionID],(err,question) => {
        if (err){
            return res.render('myTests', {
                error: err
            });
        }

        db.query(query2,[questionID],(err,answers) => {
            if (err) throw err;
            let obj = question.concat(answers);
            res.jsonp({
                question:question,
                answers:answers,
                questionID
            })
        });
    })
}

exports.edit_question = (req,res,next) =>{
    let testName = req.params.name;
    let QuestionID = req.body.QID;
    let points = req.body.selectPoint;
    let questiontext = req.body.textQuest;
    let answerA = req.body.ansa;
    let answerB = req.body.ansb;
    let answerC = req.body.ansc;
    let answerD = req.body.ansd;
    let corrA = req.body.corr == 'A' ? 1 : 0;
    let corrB = req.body.corr == 'B' ? 1 : 0;
    let corrC = req.body.corr == 'C' ? 1 : 0;
    let corrD = req.body.corr == 'D' ? 1 : 0;

    let updateQuestionQuery = 'update questions set QuestionText = ?, Points=? where ID like ?;';
    let updateAnswers_viewQuery = 'update answers_view set ans1 = ?,ans2 = ?,ans3 = ?,ans4 = ? where IDQuestion like ?;';
    let updateAnswersQuery = 'update answers set AnswerText = ?, Correct = ? where QuestionID like ? and ID like ?;';
    let selectAnswersID = 'select id from answers where QuestionID like ?;';


    db.beginTransaction((err)=>{
        if (err) return next(err);
        db.query(updateQuestionQuery,[questiontext,points,QuestionID],(err,updateQuestion)=>{
            if (err) return next(err);
            db.query(updateAnswers_viewQuery,[answerA,answerB,answerC,answerD,QuestionID],(err, updateAnswers_view)=>{
                if (err) return next(err);
                db.query(selectAnswersID,[QuestionID],(err,AnswerID)=>{
                    if (err) return next(err);
                    /*Update answers one by one*/
                db.query(updateAnswersQuery,[answerA,corrA,QuestionID,AnswerID[0].id],(err,updateA)=>{
                    if (err) return next(err);
                    db.query(updateAnswersQuery,[answerB,corrB,QuestionID,AnswerID[1].id],(err,updateB)=>{
                        if (err) return next(err);
                        db.query(updateAnswersQuery,[answerC,corrC,QuestionID,AnswerID[2].id],(err,updateC)=>{
                            if (err) return next(err);
                            db.query(updateAnswersQuery,[answerD,corrD,QuestionID,AnswerID[3].id],(err,updateD)=>{
                                if (err) return next(err);
                                db.commit((err)=> {
                                    if (err) {
                                        return db.rollback(() => {
                                        throw err;
                                        });
                                    }
                                    res.redirect('/test/' + testName);
                                    req.flash('success_msg', 'Succesfully updated!');
                                    console.log('Succesfully updated!');
                                    });                    
                            });
                        });
                    });
                });
                })
                
            });
        });
    });
}

exports.get_tests = (req,res,next) => {
    let getTests = 'select id, testName from tests';
    db.query(getTests,(err,tests) => {
        if (err) {
            return res.status(404).jsonp({
                message: 'Something went wrong'
            });
        }
        res.jsonp({
            tests
        })
    })
}

exports.questions_from_selected_test = (req,res,next) => {
    let testID = req.body.testID;
    console.log(testID);
    let queryQuestions = 'SELECT questions.ID,QuestionText,ans1,ans2,ans3,ans4 FROM questions ' +
        'INNER JOIN test_details ON test_details.QuestionID=questions.ID ' +
        'INNER JOIN tests ON test_details.TestID=tests.ID ' +
        'INNER JOIN answers_view on questions.id=answers_view.IDQuestion '+
        'INNER JOIN categories ON tests.CategoryID=categories.ID WHERE tests.id like ?;';

        db.query(queryQuestions,[testID],(err,questions) => {
            if (err) throw err;

            res.jsonp({
                questions
            })
        })
}