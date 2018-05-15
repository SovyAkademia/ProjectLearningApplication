const express = require('express');
const router = express.Router();

//Import controller
const createTestController = require('../controller/createTest');

router.get('/', ensureAuth,createTestController.get_create_test);
router.post('/',createTestController.create_test);

//Access Controll
function ensureAuth(req,res,next){
    if (req.isAuthenticated()){
        return next();
    } else{
        req.flash('error_msg','You are not authorized to view this page');
        res.redirect('/');
    }
}

module.exports = router;