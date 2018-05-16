
const express = require('express');
const router = express.Router();

//Import controller
const desktopController = require('../controller/desktop');

router.get('/getCategories', desktopController.get_categories);
router.get('/getTests/:category', desktopController.get_tests);
router.get('/testInfo/:id', desktopController.get_test_info);

module.exports = router;