const db = require('../models/db');
const _ = require('lodash');
const flash = require('connect-flash');
const dateFormat = require('dateformat');
const nodemailer = require('nodemailer');
const generator = require('generate-password');

let mailer = require('../middleware/mailer');

module.exports.radarGr = (id,callback) =>{
    let averageScore = 'select coalesce(avg(score),0) as score from results '+ 
    'inner join tests on tests.id=results.testid '+
    'inner join categories on tests.categoryid=categories.id where categories.categoryname = "HTML" and results.studentid like ' +id+ 
    ' union all '+ 
    'select coalesce(avg(score),0) as score from results '+ 
    'inner join tests on tests.id=results.testid '+
    'inner join categories on tests.categoryid=categories.id where categories.categoryname = "C" and results.studentid like ' +id+
    ' union all '+
    'select coalesce(avg(score),0) as score from results '+
    'inner join tests on tests.id=results.testid '+
    'inner join categories on tests.categoryid=categories.id where categories.categoryname = "JavaScript" and results.studentid like '+id+
    ' union all '+
    'select coalesce(avg(score),0) as score from results '+
    'inner join tests on tests.id=results.testid '+
    'inner join categories on tests.categoryid=categories.id where categories.categoryname = "SQL" and results.studentid like '+id+
    ' union all '+
    'select coalesce(avg(score),0) as score from results '+
    'inner join tests on tests.id=results.testid '+
    'inner join categories on tests.categoryid=categories.id where categories.categoryname = "Java" and results.studentid like '+id+
    ' union all '+
    'select coalesce(avg(score),0) as score from results '+
    'inner join tests on tests.id=results.testid '+
    'inner join categories on tests.categoryid=categories.id where categories.categoryname = "Linux" and results.studentid like '+id+';';
    db.query(averageScore,callback);
    
}