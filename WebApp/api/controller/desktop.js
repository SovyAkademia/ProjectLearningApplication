const db = require('../models/db');

exports.get_categories = (req, res, next) => {

    let query = 'select name from categories';

    db.query(query, (err, result) => {
        if (err) { throw err };

        res.send(result);
    });

}