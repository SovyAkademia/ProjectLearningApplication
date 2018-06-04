const express = require('express');
const router = express.Router();

//Import controller
const testController = require('../controller/testController');
const addQuestion = require('../controller/addNewQuestion');
const authTeacher = require('../middleware/authTeacher');


router.post('/deleteQuestion',authTeacher,testController.delete_question);
router.post('/questions',authTeacher,testController.questions_from_selected_test);
router.get('/:name/tests',authTeacher,testController.get_tests);
router.post('/:name/edit',authTeacher,testController.edit_question);
router.get('/:name',authTeacher,testController.get_test_creator);
router.post('/:name',authTeacher,addQuestion.add_question);
router.get('/:name/:id',authTeacher,testController.show_edit_modal);


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