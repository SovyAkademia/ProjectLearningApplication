const express = require('express');
const router = express.Router();

//Import controller
const testController = require('../controller/testController');
const addQuestion = require('../controller/addNewQuestion');

router.get('/:name', ensureAuth,testController.get_test_creator);
router.post('/:name',testController.add_question);

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