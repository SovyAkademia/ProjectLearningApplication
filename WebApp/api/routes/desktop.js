
const express = require('express');
const router = express.Router();
const authStudent = require('../middleware/authStudent');

//Import controller
const desktopController = require('../controller/desktop');

router.get('/getCategories', desktopController.get_categories);
router.get('/getTests/:category', desktopController.get_tests);
router.get('/testInfo/:id', desktopController.get_test_info);
router.post('/auth/login',desktopController.student_login);
router.post('/getTest',authStudent,desktopController.get_test);
router.get('/getTime',desktopController.server_time);

module.exports = router;