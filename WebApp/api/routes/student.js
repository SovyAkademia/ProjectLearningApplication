const express = require('express');
const router = express.Router();
const authTeacher = require('../middleware/authTeacher');

//Import controller
const studentController = require('../controller/student');
const studentDetails = require('../controller/studentDetails')
/* ADD AUTHENTIFICATION */
router.get('/',studentController.show_all);
router.get('/:id',studentDetails.show_student);
router.post('/class',studentController.get_class);
router.get('/remove/:id',studentController.remove_student);
router.post('/category',studentDetails.tests_in_category);
router.get('/pass/:id',studentDetails.pass);
router.get('/archive/:id',studentDetails.archive_student);


module.exports = router;