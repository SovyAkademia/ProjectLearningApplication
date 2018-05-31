const db = require('../models/db');
const _ = require('lodash');
const flash = require('connect-flash');
const dateFormat = require('dateformat');
const nodemailer = require('nodemailer');
const generator = require('generate-password');

let mailer = require('../middleware/mailer');

module.exports.radarGr = (callback) =>{
    let averageScore = 'select avg(score) as score from results '+ 
    'inner join tests on tests.id=results.testid '+
    'inner join categories on tests.categoryid=categories.id where tests.categoryid = 2 '+ 
    'union '+ 
    'select avg(score) as score from results '+ 
    'inner join tests on tests.id=results.testid '+
    'inner join categories on tests.categoryid=categories.id where tests.categoryid = 1 '+
    'union '+
    'select avg(score) as score from results '+
    'inner join tests on tests.id=results.testid '+
    'inner join categories on tests.categoryid=categories.id where tests.categoryid = 3;';
    db.query(averageScore,callback);
}