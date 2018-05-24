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
    let getTests = 'select * from tests where CategoryID = ?';

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

    let query1 = 'select testName from tests where id = ?';
    let query = 'SELECT questions.id as questionID,questionText, answerText FROM questions INNER JOIN answers ON questions.ID=answers.QuestionID INNER JOIN test_details ON test_details.QuestionID=questions.ID INNER JOIN tests ON test_details.TestID=tests.ID WHERE tests.ID=? ';
    db.query(query1, [req.body.testId], (err, testName) => {
        if (err || testName.length < 1){
            return res.status(404).json({
                message: 'failed to retrieve test'
            })
        }

        db.query(query, [req.body.testId], (err, result) => {
            if (err){
                return res.status(404).json({
                    message: 'failed to retrieve test'
                })
            };

            res.status(200).json({
                testName: testName[0].testName,
                questions: result
            });
        });
    });
}
