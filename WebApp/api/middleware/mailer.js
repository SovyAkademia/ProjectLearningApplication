const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


module.exports.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type:'OAuth2',
        user: 'testsovy@gmail.com',
        clientId:'274776685176-6g364ch25r8pmufta10j0uui3bsi1r4o.apps.googleusercontent.com',
        clientSecret:'HTecPNhmrB9pKOyaw5YYiHGL',
        refreshToken:'1/-JQkQwv5qHhSv-NoWKWo1q58GWnEAfUL-28TBu03Ohc'
    }
  });