const express = require('express');
const router = express.Router();

//Import controller
const testController = require('../controller/testController');
const addQuestion = require('../controller/addNewQuestion');

router.post('/deleteQuestion',testController.delete_question);
router.post('/questions',testController.questions_from_selected_test);
router.get('/:name/tests',testController.get_tests);
router.post('/:name/edit',testController.edit_question);
router.get('/:name',testController.get_test_creator);
router.post('/:name',addQuestion.add_question);
router.get('/:name/:id',testController.show_edit_modal);


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