const db = require('../models/db');

exports.show_all = (req, res, next) => {

    let selectAllQuery = 'select FirstName, LastName, Email from teachers;';

    db.query(selectAllQuery, (err, teacher) => {
        if (err) return next(err);
        res.render('teacher', { teacher });
        console.log(teacher);
    });
}