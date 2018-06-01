const db = require('../models/db');
const _ = require('lodash');

exports.show_all = (req, res, next) => {
    // console.log(req.user);
    let yearToGet = calcClass(1);
    db.query('select ID,FirstName, LastName, Email from students where Year like ? and allowed = 1;',[yearToGet], (err, result) => {
        if (err) throw err;
        result.map(student => student.class = 1);
        res.render('students', {
            result: result,
            where:'Students',
            class:1
        });
    });
}

exports.remove_student = (req, res, next) => {
    let id = req.params.id;
    let findStudent = 'select FirstName, LastName,Email,Year from students where id like ?;';
    let archiveQuery = 'insert into students_history (FirstName,LastName,Email,DateOfDelete,Year) '+
    'values (?,?,?,now(),?);';
    let deleteQuery = 'delete from students where id like ?;';

    console.log('archiving student');

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

exports.get_class = (req, res, next) => {
    classNumber = req.body.options;
    let yearToGet = calcClass(classNumber);

    let query = 'select ID,FirstName, LastName, Email from students where Year like ? and allowed = 1 ;'

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