const db = require('../models/db');

exports.add_question = (req, res, next) => {
    let name = req.params.name;
    console.log(name);


    let all = req.body;
    console.log(all);
    let test = req.params.name;
    let question = req.body.textQuest;
    let points = req.body.selectPoint;
    let answerA = req.body.ansa;
    let answerB = req.body.ansb;
    let answerC = req.body.ansc;
    let answerD = req.body.ansd;
    let corrA = req.body.A == 'on' ? 1 : 0;
    let corrB = req.body.B == 'on' ? 1 : 0;
    let corrC = req.body.C == 'on' ? 1 : 0;
    let corrD = req.body.D == 'on' ? 1 : 0;

    console.log({
        test,
        question,
        points,
        answerA,
        answerB,
        answerC,
        answerD,
        corrA,
        corrB,
        corrC,
        corrD
    });

    let queryFindTest = 'select * from tests where TestName like ?;';
    let queryInsertQuestion = 'insert into questions (QuestionText,Points) values(?,?);';
    let queryIdQuestion = 'select id from questions where QuestionText like ?;';
    let queryIdTest = 'select id from tests where TestName like ?;';
    let queryInsertTestDetails = 'insert into test_details (TestID, QuestionID) values(?,?);';
    let queryInsertA = 'insert into answers (QuestionID,AnswerText, Correct) values (?,?,?);';
    let queryInsertB = 'insert into answers (QuestionID,AnswerText, Correct) values (?,?,?);';
    let queryInsertC = 'insert into answers (QuestionID,AnswerText, Correct) values (?,?,?);';
    let queryInsertD = 'insert into answers (QuestionID,AnswerText, Correct) values (?,?,?);';
    /* Insert question into question table */
    db.query(queryInsertQuestion, [question, points], (err, insertQuestion) => {
        if (err) throw err;
    /* find id of question */
        db.query(queryIdQuestion, [question], (err, QuestionId) => {
            if (err) throw err;
    /* find id od test */
            db.query(queryIdTest, [test], (err, TestId) => {
                if (err) throw err;
                console.log(QuestionId[0].id);

                console.log(TestId[0].id);
    /* insert question id and test id into test_details table */
                db.query(queryInsertTestDetails, [TestId[0].id, QuestionId[0].id], (err, insertTestDetails) => {
                    if (err) throw err;
    /* insert answers to table answers */      
                    db.query(queryInsertA,[QuestionId[0].id,answerA,corrA], (err,insertA)=>{
                        if (err) throw err;
                        db.query(queryInsertB,[QuestionId[0].id,answerB,corrB], (err,insertB)=>{
                            if (err) throw err;
                            db.query(queryInsertC,[QuestionId[0].id,answerC,corrC], (err,insertC)=>{
                                if (err) throw err;
                                db.query(queryInsertD,[QuestionId[0].id,answerD,corrD], (err,insertD)=>{
                                    if (err) throw err;
                                    console.log("Inserted");

                                    res.redirect('/test/' + name);

                                })
                            })
                        })
                            
                    })


                })

            })
        })


    })



}