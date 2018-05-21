const express = require('express');
const router = express.Router();

//Import controller
const myTestsController = require('../controller/myTests');

router.get('/',myTestsController.get_all_tests);

module.exports = router;