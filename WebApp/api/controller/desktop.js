const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.get_categories = (req, res, next) => {
    let query = 'select CategoryName from categories';

    db.query(query, (err, result) => {
        if (err) {
            return res.status(404).json({
                message: 'Something went wrong when retrieving categories'
            });
        };

        res.json({
            categories: result
        })

    });

}

exports.get_tests = (req, res, next) => {

    let category = req.params.category;

    let getCategoryId = 'select id from categories where CategoryName like ?';
    let getTests = 'select * from tests where CategoryID = ? and allowed = 1';

    db.query(getCategoryId, [category], (err, categoryId) => {
        if (err || categoryId.length == 0) {
            return res.status(404).json({
                message: 'Something went wrong'
            });
        }
        console.log(categoryId);

        db.query(getTests, [categoryId[0].id], (err, tests) => {
            if (err) {
                return res.status(404).json({
                    message: 'Something went wrong'
                });
            }
            res.json({
                tests
            })
        });
    });
}

exports.get_test_info = (req, res, next) => {
    let testId = req.params.id;
    let query = 'select Count(testID) as num from test_details where testID = ?';

    db.query(query, [testId], (err, questions) => {
        if (err) {
            return res.status(404).json({
                message: 'Something went wrong'
            });
        }
        console.log(questions);

        res.json({
            TestInfo: {
                questions: questions[0].num
            }
        })
    });
}

exports.student_login = (req, res, next) => {
    let studentEmail = req.body.email;
    let studentPass = req.body.password;

    let findStudent = 'select id,email,password from students where email like ?';

    db.query(findStudent, [studentEmail], (err, result) => {
        if (err) throw err;

        if (result.length < 1) {
            return res.status(401).json({
                message: 'authentication failed'
            });

        } else {
            bcrypt.compare(studentPass, result[0].password, (err, match) => {
                if (err) {
                    return res.status(401).json({
                        message: 'authentication failed'
                    });
                }

                if (match) {
                    const token = jwt.sign({
                        email: studentEmail
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "2h"
                        }
                    )
                    return res.status(200).json({
                        message: 'authentication successful',
                        studentId: result[0].id,
                        token
                    });
                }

                res.status(401).json({
                    message: 'authentication failed'
                });
            })
        }

    });
}

exports.get_test = (req, res, next) => {

    let studentID = req.body.studentID;
    let testID = req.body.testId;

    let insertResult = 'insert into results (studentid,testid,begintime,tempscore) values(?,?,now(),0)';
    let query1 = 'select testName from tests where id = ?';
    let query = 'SELECT questions.id as questionID,questionText, answerText, answers.id as answerID FROM questions INNER JOIN answers ON questions.ID=answers.QuestionID INNER JOIN test_details ON test_details.QuestionID=questions.ID INNER JOIN tests ON test_details.TestID=tests.ID WHERE tests.ID=? ';

    db.query(insertResult, [studentID, testID], (err, inserted) => {
        if (err) {
            return res.status(404).json({
                message: 'failed to retrieve test'
            })
        }

        let resultID = inserted.insertId;
        resultID = String(resultID);
        console.log(resultID);

        db.query(query1, [testID], (err, testName) => {
            if (err || testName.length < 1) {
                return res.status(404).json({
                    message: 'failed to retrieve test'
                })
            }

            db.query(query, [req.body.testId], (err, result) => {
                if (err) {
                    return res.status(404).json({
                        message: 'failed to retrieve test'
                    })
                };

                res.status(200).json({
                    resultID: resultID,
                    testName: testName[0].testName,
                    questions: result
                });
            });
        });

    });

}

exports.server_time = (req, res, next) => {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    res.status(200).json({
        datetime
    });
}

exports.change_password = (req, res, next) => {
    let studentID = req.body.studentID;
    let currentPassword = req.body.actualPassword;
    let newPassword = req.body.newPassword;

    let getCurrentPass = 'select password from students where id = ?';
    let updatePass = 'update students set password = ? where id = ?';

    console.log(req.body);

    db.query(getCurrentPass, [studentID], (err, pass) => {
        if (err || pass.length == 0) {

            return res.send('something went wrong');
        }

        bcrypt.compare(currentPassword, pass[0].password, (err, match) => {
            if (err) {
                return res.status(401).send('wrong password');
            }

            if (match) {
                bcrypt.hash(newPassword, 10, (err, hash) => {
                    if(err){
                        return res.status(500).send('something went wrong');
                    }

                    db.query(updatePass, [hash, studentID], (err, updated) => {
                        if (err) {

                            return res.status(500).send('something went wrong');
                        } else {

                            return res.status(200).send('password updated');
                        }

                    });
                })

            } else {
                return res.status(401).send('wrong password');
            }

        });

    });

}

exports.handle_answer = (req, res, next) => {
    let resultID = req.body.resultID;
    let studentID = req.body.studentID;
    let questionID = req.body.questionID;
    let answerID = req.body.answerID;

    let insertToResultDetails = 'insert into result_details(resultid,questionid,answerid) values(?,?,?)';
    let selectPoints = 'select points from questions where id = ?';
    let selectCorrect = 'select correct from answers where id = ?';
    let selectTempScore = 'select tempscore from results where id = ?';
    let updateScore = 'update results set tempscore = ? where id = ?';

    db.query(insertToResultDetails, [resultID, questionID, answerID], (err, result) => {
        if (err) {
            return res.status(404).json({
                message: 'something went wrong'
            });
        }
        db.query(selectPoints, [questionID], (err, points) => {
            if (err) {
                return res.status(404).json({
                    message: 'something went wrong'
                });
            }

            db.query(selectCorrect, [answerID], (err, correct) => {
                if (err) {
                    return res.status(404).json({
                        message: 'something went wrong'
                    });
                }

                if (correct[0].correct == 0) {
                    return res.status(200).send('incorrect');
                }

                db.query(selectTempScore, [resultID], (err, tempScore) => {
                    if (err) {
                        return res.status(404).json({
                            message: 'something went wrong'
                        });
                    }
                    let updatedScore = tempScore[0].tempscore + points[0].points;
                    console.log(updatedScore);

                    db.query(updateScore, [updatedScore, resultID], (err, updated) => {
                        if (err) {
                            return res.status(404).json({
                                message: 'something went wrong'
                            });
                        }
                        console.log('score updated')
                        return res.status(200).send('correct');
                    });


                })
            })
        })

    })
}
