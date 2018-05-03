const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').strategy;
const flash = require('connect-flash');

//Import controller
const loginController = require('../controller/login');


router.get('/',loginController.index_get);
router.get('/dashboard',ensureAuth,loginController.dashboard);
router.post('/login',loginController.login);
router.get('/logout', loginController.logout);

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