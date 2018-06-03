const express = require('express');
const router = express.Router();
const authTeacher = require('../middleware/authTeacher');

//Import controller
const createTestController = require('../controller/createTest');
console.log('im in createtest route');

router.get('/',authTeacher, createTestController.get_create_test);
router.post('/',authTeacher,createTestController.create_test);
router.post('/createCategory',authTeacher,createTestController.create_category);

module.exports = router;