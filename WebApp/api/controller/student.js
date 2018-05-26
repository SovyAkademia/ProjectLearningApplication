const db = require('../models/db');
const _ = require('lodash');

exports.show_all = (req, res, next) => {
    // console.log(req.user);
    let yearToGet = calcClass(1);
    db.query('select ID,FirstName, LastName, Email from students where Year like ?;',[yearToGet], (err, result) => {
        if (err) throw err;
        result.map(student => student.class = 1);
        res.render('students', {
            result: result,
            where:'Students',
            class:1
        });
    });
}

exports.show_student = (req, res, next) => {

    let id = req.params.id;
    let findStudent = 'select FirstName, LastName from students where ID = ?';
    let findStudentResults = 'SELECT TestName FROM tests ' +
        'INNER JOIN results ON tests.ID=results.TestID ' +
        'INNER JOIN categories ON tests.CategoryID=categories.ID WHERE results.StudentID like ?;';
    let countTest = 'SELECT Count(TestName) as Count FROM tests ' +
        'INNER JOIN results ON tests.ID=results.TestID ' +
        'INNER JOIN categories ON tests.CategoryID=categories.ID WHERE results.StudentID like ?;';

    db.query(findStudent, [id], (err, student) => {
        if (err) throw err;
        db.query(countTest, [id], (err, count) => {
            if (err) throw err;
            let num = count[0].Count;
            db.query(findStudentResults, [id], (err, result) => {
                if (err) throw err;
                let testArr = [];
                for (let index = 0; index < count[0].Count; index++) {
                    let element = (result[index].TestName);
                    testArr.push(element);
                }
                res.render('studentDetails', {
                    student,
                    testArr
                })
            });
        });
    })
}

exports.remove_student = (req, res, next) => {
    let id = req.params.id;
    let query = 'delete from students where id = ?';

    db.query(query,[id],(err,result) => {
        if(err) throw err;

        res.redirect('/students');
    })
}

exports.get_class = (req, res, next) => {
    classNumber = req.body.options;
    let yearToGet = calcClass(classNumber);

    let query = 'select ID,FirstName, LastName, Email from students where Year like ?;'

    db.query(query,[yearToGet],(err,result) => {
        if(err){
            return res.status(404).render('students');
        }
        result.map(student => student.class = classNumber);
         result = _.orderBy(result,'LastName','asc');
    
        res.render('students',{
            result,
            where:'Students',
            class:classNumber
        })
    })

}

const calcClass = (classNumber) => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    let yearToGet;
    if (month < 9) {
        return yearToGet = year - classNumber;
    } else {
        return yearToGet = year - (classNumber - 1);
    }
}