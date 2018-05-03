const express = require('express');
const router = express.Router();

//Import controller
const regTeacherController = require('../controller/registerTeacher');

router.get('/', regTeacherController.get_teacher_reg_form);
router.post('/', regTeacherController.register_new_teacher);

module.exports = router;