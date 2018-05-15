
const express = require('express');
const router = express.Router();

//Import controller
const desktopController = require('../controller/desktop');

router.get('/getCategories', desktopController.get_categories);


module.exports = router;