const db = require('../models/db');

exports.get_create_test = (req,res,next) => {
    res.render('newTest');
}