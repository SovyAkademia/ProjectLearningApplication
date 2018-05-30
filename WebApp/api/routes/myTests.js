const express = require('express');
const router = express.Router();
const authTeacher = require('../middleware/authTeacher');

//Import controller
const myTestsController = require('../controller/myTests');

router.get('/',authTeacher,myTestsController.get_all_tests);
router.post('/category',authTeacher,myTestsController.get_all_tests_in_category);
router.post('/enable',authTeacher,myTestsController.enable_test);

module.exports = router;