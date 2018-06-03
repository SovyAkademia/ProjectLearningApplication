const express = require('express');
const router = express.Router();
const authTeacher = require('../middleware/authTeacher');
const nodemailer = require('nodemailer');
const generator = require('generate-password');

let mailer = require('../middleware/mailer');

//Import controller
const teacherController = require('../controller/teacher');

router.get('/',authTeacher, teacherController.show_all);
router.post('/send',authTeacher,teacherController.send_invitation);
router.get('/archive/:id',authTeacher,teacherController.archive_teacher);
router.get('/makeAdmin/:id',authTeacher,teacherController.make_admin);
router.get('/delete/:id',authTeacher,teacherController.delete_teacher);

module.exports = router;