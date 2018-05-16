
const express = require('express');
const router = express.Router();

//Import controller
const desktopController = require('../controller/desktop');

router.get('/getCategories', desktopController.get_categories);
router.get('/getTests/:category', desktopController.get_tests);

module.exports = router;