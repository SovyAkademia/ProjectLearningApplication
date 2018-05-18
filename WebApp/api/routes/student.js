const express = require('express');
const router = express.Router();

//Import controller
const studentController = require('../controller/student');

router.get('/', ensureAuth,studentController.show_all);
router.get('/:id', ensureAuth,studentController.show_student);
router.post('/class', ensureAuth,studentController.get_class);
router.get('/remove/:id', ensureAuth,studentController.remove_student);
//Access Controll
function ensureAuth(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }else{
        req.flash('error_msg','You are not authorized to view this page');
        res.redirect('/');
    }
}

module.exports = router;