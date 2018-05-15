const db = require('../models/db');

exports.get_create_test = (req,res,next) => {
    let query = 'select name from categories';

    db.query(query, (err, result) => {
        if (err) { throw err };

        res.render('newTest',{
            categories:result
        });
        
    });
    
}