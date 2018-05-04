const express = require('express');
const router = express.Router();

//Import controller
const studentController = require('../controller/student');

router.get('/', ensureAuth,studentController.show_all);
router.get('/java', ensureAuth,studentController.show_all_java);

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