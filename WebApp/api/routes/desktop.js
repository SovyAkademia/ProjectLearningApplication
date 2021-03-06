
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
router.post('/handleAnswer',authStudent,desktopController.handle_answer);
router.post('/changePassword',authStudent,desktopController.change_password);
router.post('/finalScore',authStudent,desktopController.final_score);

module.exports = router;