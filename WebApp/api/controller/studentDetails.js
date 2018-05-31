const db = require('../models/db');
const _ = require('lodash');
const flash = require('connect-flash');
const dateFormat = require('dateformat');
const nodemailer = require('nodemailer');
const generator = require('generate-password');

let mailer = require('../middleware/mailer');

exports.show_student = (req, res, next) => {
    let id = req.params.id;
    let findStudent = 'select ID,FirstName, LastName from students where id like ?;';
    let findStudentTests = 'select students.ID AS "StudentID",FirstName, LastName,CategoryName,TestName, Score from students ' +
        'INNER JOIN results ON results.StudentID = students.ID ' +
        'INNER JOIN tests ON tests.ID=results.TestID ' +
        'INNER JOIN categories ON tests.CategoryID=categories.ID ' +
        'WHERE students.ID like ?;';
    let findStudentResults = 'SELECT CategoryName,TestName, Score FROM tests ' +
        'INNER JOIN results ON tests.ID=results.TestID ' +
        'INNER JOIN categories ON tests.CategoryID=categories.ID WHERE results.StudentID like ?;';
    let countTest = 'SELECT Count(TestName) as Count FROM tests ' +
        'INNER JOIN results ON tests.ID=results.TestID ' +
        'INNER JOIN categories ON tests.CategoryID=categories.ID WHERE results.StudentID like ?;';
    let getCategories = 'select * from categories;';
    let averageScore = 'select avg(score) as score from results '+ 
    'inner join tests on tests.id=results.testid '+
    'inner join categories on tests.categoryid=categories.id where tests.categoryid = 2 '+ 
    'union '+ 
    'select avg(score) as score from results '+ 
    'inner join tests on tests.id=results.testid '+
    'inner join categories on tests.categoryid=categories.id where tests.categoryid = 1 '+
    'union '+
    'select avg(score) as score from results '+
    'inner join tests on tests.id=results.testid '+
    'inner join categories on tests.categoryid=categories.id where tests.categoryid = 3;';

    db.query(findStudent,[id],(err,studentInfo)=>{
        if (err) return next(err); 
    db.query(findStudentTests, [id], (err, student) => {
        if (err) return next(err);
        db.query(countTest, [id], (err, count) => {
            if (err) return next(err);
            let num = count[0].Count;
            db.query(findStudentResults, [id], (err, testScore) => {
                if (err) return next(err);
                let testArr = [];
                let scoreArr = [];
                for (let index = 0; index < count[0].Count; index++) {
                    let test = (testScore[index].TestName);
                    let score = (testScore[index].Score);
                    testArr.push(test);
                    scoreArr.push(score);
                }
                db.query(averageScore, (err,scoreRadar)=>{
                    if (err) return next(err);
                    let scoreRadarArr = [];
                    for (index = 0; index < 3; index++) {
                        if (scoreRadar[index].score != null) {
                            let element = (scoreRadar[index].score);
                            scoreRadarArr.push(element);            
                        }else{
                            scoreRadarArr.push(0);            
                        }
                    }
                    db.query(getCategories, (err, categories) => {
                        if (err) {
                            return res.render('studentDetails', {
                                error: err
                            });
                        }
                        res.render('studentDetails', {
                            categories,
                            student,
                            testArr,
                            scoreArr,
                            studentInfo,
                            scoreRadarArr
                        });
                    });
                });                
            });
        });
    });
});
}

exports.tests_in_category = (req, res, next) => {
    let categoryId = req.body.options;
    let studentID = req.body.student_id;
    let id = req.body.student_id;
    let findStudent = 'select ID,FirstName, LastName from students where id like ?;';
    let findStudentResults = 'SELECT CategoryName,TestName, Score, Date FROM tests ' +
        'INNER JOIN results ON tests.ID=results.TestID ' +
        'INNER JOIN categories ON tests.CategoryID=categories.ID ' +
        'WHERE results.StudentID like ? and categoryid like ? limit 5;';
    let findStudentTests = 'select students.ID AS "StudentID",FirstName, LastName,CategoryName,TestName, Score from students ' +
        'INNER JOIN results ON results.StudentID = students.ID ' +
        'INNER JOIN tests ON tests.ID=results.TestID ' +
        'INNER JOIN categories ON tests.CategoryID=categories.ID ' +
        'WHERE results.StudentID like ? and categoryid like ?;';
    let countTest = 'SELECT Count(TestName) as Count FROM tests ' +
        'INNER JOIN results ON tests.ID=results.TestID ' +
        'INNER JOIN categories ON tests.CategoryID=categories.ID ' +
        'WHERE results.StudentID like ? and categoryid like ?;';
    let getCategories = 'select * from categories';
    let averageScore = 'select avg(score) as scoreHTML from results '+
    'inner join tests on tests.id=results.testid '+
    'inner join categories on tests.categoryid=categories.id where categories like ?;';

    if (categoryId == 'all') {
        return res.redirect('/students/' + studentID);
    }
    db.query(findStudent,[id],(err,studentInfo)=>{
        if (err) return next(err); 
    db.query(findStudentTests, [studentID,categoryId], (err, student) => {
        if (err) return next(err);
        db.query(countTest, [studentID, categoryId], (err, count) => {
            if (err) return next(err);
            let num = count[0].Count;
            if (num != 0 || student !=null){ 
                db.query(findStudentResults, [studentID, categoryId], (err, testScore) => {
                    if (err) return next(err);
                    let testArr = [];
                    let scoreArr = [];
                    for (let index = 0; index < count[0].Count; index++) {
                        let test = (testScore[index].TestName);
                        let score = (testScore[index].Score);
                        testArr.push(test);
                        scoreArr.push(score);
                    }
                    db.query(getCategories, (err, categories) => {
                        if (err) {
                            return res.render('studentDetails', {
                                error: err
                            });
                        }
                        res.render('studentDetails', {
                            categories,
                            student,
                            testArr,
                            scoreArr,
                            studentInfo                            
                        });
                    });
                });
                
            } else{
                req.flash('error_msg', 'NO Tests in this category');               

                res.redirect('/students/' + studentID);

            } 
            
        });
    });
});
}

exports.archive_student = (req,res,next) => {
    let id = req.params.id;
    let findStudent = 'select FirstName, LastName,Email,Year from students where id like ?;';
    let archiveQuery = 'insert into students_history (FirstName,LastName,Email,DateOfDelete,Year) '+
    'values (?,?,?,now(),?);';
    let deleteQuery = 'delete from students where id like ?;';

    db.query(findStudent,[id],(err,student)=>{
        if (err) return next(err);
        db.query(archiveQuery,[student[0].FirstName,student[0].LastName,student[0].Email,student[0].Year],
        (err,result)=>{
            db.query(deleteQuery,[id],(err,deleteInfo)=>{
                req.flash('error_msg', 'Student archived');
                res.redirect('/students');
            })
        })

    })
}

exports.pass = (req,res,next)=>{
    let id = req.params.id;
    let pass = generator.generate({length:6, numbers:true});
    let queryFindStudent = 'select Email from students where id like ?;';
    db.query(queryFindStudent,[id],(err,result)=>{
        if (err) return next(err);
        console.log(result[0].Email);
        mailer.transporter.sendMail({
            from: '"Nodemailer Contact" <NO-REPLY>', // sender address
            to: result[0].Email, // list of receivers
            subject: 'Access to app', // Subject line
            text: 'Password for registration is  '+ pass, // plain text body
            
        }, (err, info) => {
            req.flash('msg','Email has been sent');
            res.redirect('/students/'+id);
    });  
    })
    
}