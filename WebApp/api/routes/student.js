const express = require('express');
const router = express.Router();
const authTeacher = require('../middleware/authTeacher');

//Import controller
const studentController = require('../controller/student');

router.get('/', authTeacher,studentController.show_all);
router.get('/:id', authTeacher,studentController.show_student);
router.post('/class', authTeacher,studentController.get_class);
router.get('/remove/:id', authTeacher,studentController.remove_student);

module.exports = router;