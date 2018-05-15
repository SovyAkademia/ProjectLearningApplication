const db = require('../models/db');


exports.newCategory = (req,res,next) => {
    let categoryName = req.body.categoryName;
    let query = 'insert into categories (Name) values (?);';


    db.query(query,[categoryName],(err,result) => {
        if (err) { 
            throw err;      
        }
        res.render('newtest', {message:'New category added'});
    });
}