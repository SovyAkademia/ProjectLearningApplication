const db = require('../models/db');

exports.add_question = (req, res, next) => {
    let name = req.params.name;
    console.log(name);

    let question = req.body;
    console.log(question);

    res.redirect('/test/'+name);
    
}