const db = require('../models/db');

exports.get_categories = (req, res, next) => {

    let query = 'select name from categories';

    db.query(query, (err, result) => {
        if (err) { throw err };
        console.log(result[1]);

        res.json({
            categories:result
        })
        
    });

}

exports.get_tests = (req,res,next) => {
    
    console.log(req.params);
}