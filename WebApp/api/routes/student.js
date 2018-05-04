const express = require('express');
const router = express.Router();

//Import controller
const studentController = require('../controller/student');

router.get('/', studentController.show_all);
router.get('/java', studentController.show_all_java);

module.exports = router;