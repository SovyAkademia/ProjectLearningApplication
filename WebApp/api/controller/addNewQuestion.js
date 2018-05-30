const db = require('../models/db');

exports.add_question = (req, res, next) => {
    let name = req.params.name;
    let all = req.body;
    let test = req.params.name;
    let question = req.body.textQuest;
    let points = req.body.selectPoint;
    let answerA = req.body.ansa;
    let answerB = req.body.ansb;
    let answerC = req.body.ansc;
    let answerD = req.body.ansd;
    let corrA = req.body.corr == 'A' ? 1 : 0;
    let corrB = req.body.corr == 'B' ? 1 : 0;
    let corrC = req.body.corr == 'C' ? 1 : 0;
    let corrD = req.body.corr == 'D' ? 1 : 0;
    console.log(all);
    
    let queryFindTest = 'select * from tests where TestName like ?;';
    let queryInsertQuestion = 'insert into questions (QuestionText,Points) values(?,?);';
    let queryIdTest = 'select id from tests where TestName like ?;';
    let queryInsertTestDetails = 'insert into test_details (TestID, QuestionID) values(?,?);';
    let queryInsertAnswers = 'insert into answers (QuestionID,AnswerText, Correct) '+
    'values (?,?,?),(?,?,?),(?,?,?),(?,?,?);';
    let queryAnswersView = 'insert into answers_view (IDQuestion, ans1,ans2,ans3,ans4) values(?,?,?,?,?);';
    /* transaction*/
    db.beginTransaction((err)=>{
        if (err) throw err;        
    /* Insert question into question table */
      db.query(queryInsertQuestion, [question, points], (err, insertQuestion) => {
          console.log(insertQuestion);
    /* ID of inserted question */  
    let QuestionId = insertQuestion.insertId;
    if (err) {
        return db.rollback(() => {
        throw err;
        });
    }
    /* find id od test */
            db.query(queryIdTest, [test], (err, TestId) => {
                if (err) throw err;
    /* insert question id and test id into test_details table */
                db.query(queryInsertTestDetails, [TestId[0].id, QuestionId], (err, insertTestDetails) => {
                    if (err) {
                        return db.rollback(() => {
                        throw err;
                        });
                    }
    /* insert answers to table answers */      
                    db.query(queryInsertAnswers,
                        [QuestionId,answerA,corrA,
                        QuestionId,answerB,corrB,
                        QuestionId,answerC,corrC,
                        QuestionId,answerD,corrD], (err,insertAnswers)=>{
                            if (err) {
                                return db.rollback(() => {
                                throw err;
                                });
                            } 
                            db.query(queryAnswersView,[QuestionId,answerA,answerB,answerC,answerD], (err,insertAnswerView)=>{
                                if (err) throw err;
                                db.commit((err)=> {
                                    if (err) {
                                        return db.rollback(() => {
                                        throw err;
                                        });
                                    }
                                    res.redirect('/test/' + name);
                                    console.log('success!');
                                    });
                            })                                                              
                        
                        })
                })
            })
        })
    })
}