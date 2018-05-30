const db = require('../models/db');
const _ = require('lodash');
const flash = require('connect-flash');


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
        });
    });
});
}

exports.tests_in_category = (req, res, next) => {
    let categoryId = req.body.options;
    let studentID = req.body.student_id;
    let id = req.body.student_id;
    let findStudent = 'select ID,FirstName, LastName from students where id like ?;';
    let findStudentResults = 'SELECT CategoryName,TestName, Score FROM tests ' +
        'INNER JOIN results ON tests.ID=results.TestID ' +
        'INNER JOIN categories ON tests.CategoryID=categories.ID ' +
        'WHERE results.StudentID like ? and categoryid like ?;';
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