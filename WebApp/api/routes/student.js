const express = require('express');
const router = express.Router();
const authTeacher = require('../middleware/authTeacher');

//Import controller
const studentController = require('../controller/student');
const studentDetails = require('../controller/studentDetails')
/* ADD AUTHENTIFICATION */
router.get('/',authTeacher,studentController.show_all);
router.get('/:id',authTeacher,studentDetails.show_student);
router.post('/class',authTeacher,studentController.get_class);
router.get('/remove/:id',authTeacher,studentController.remove_student);
router.post('/:id',authTeacher,studentDetails.tests_in_category);
router.get('/pass/:id',authTeacher,studentDetails.pass);
router.get('/archive/:id',authTeacher,studentDetails.archive_student);


module.exports = router;