const db = require('../models/db');
const _ = require('lodash');

exports.show_all = (req, res, next) => {
    // console.log(req.user);
    let yearToGet = calcClass(1);
    db.query('select ID,FirstName, LastName, Year from students where Year like ?;',[yearToGet], (err, result) => {
        if (err) throw err;
        result.map(student => student.class = 1);
        res.render('students', {
            result: result
        });
    });
}

exports.show_student = (req, res, next) => {

    let id = req.params.id;
    let findStudent = 'select FirstName, LastName from students where ID = ?';

    db.query(findStudent, [id], (err, student) => {
        console.log(student);
        res.render('studentDetails', {
            student
        });
    });

}

exports.get_class = (req, res, next) => {
    classNumber = req.body.options;
    let yearToGet = calcClass(classNumber);

    let query = 'select ID,FirstName, LastName from students where Year like ?;'

    db.query(query,[yearToGet],(err,result) => {
        if(err){
            return res.status(404).render('students');
        }
        result.map(student => student.class = classNumber);
         result = _.orderBy(result,'LastName','asc');
        console.log(result);
    
        res.render('students',{
            result,
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


// exports.show_all_java = (req,res,next)=>{
//     db.query('select FirstName, LastName, Email from students;',(err,result) => {
//         if(err) throw err;
//         res.send({
//             result:result/*
//             name:result[0].FirstName,
//             lname: result[0].LastName,
//             isAdmin:false
//             */
//         });
//     });

// }