const express = require('express');
const router = express.Router();
const authTeacher = require('../middleware/authTeacher');
const nodemailer = require('nodemailer');
const generator = require('generate-password');

let mailer = require('../middleware/mailer');

//Import controller
const teacherController = require('../controller/teacher');

router.get('/', teacherController.show_all);
router.post('/send',teacherController.send_invitation);
router.get('/archive/:id',teacherController.archive_teacher);
router.get('/delete/:id',teacherController.delete_teacher);

module.exports = router;