const express = require('express');
const router = express.Router();
const authTeacher = require('../middleware/authTeacher');

//Import controller
const teacherController = require('../controller/teacher');

router.get('/', authTeacher,teacherController.show_all);

module.exports = router;