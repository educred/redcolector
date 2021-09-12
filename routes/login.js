require('dotenv').config();
/* === DEPENDINȚE === */
const path     = require('path');
const fs       = require('fs');
const express  = require('express');
const router   = express.Router();
const passport = require('passport');

// CONSTANTE
const LOGO_IMG = "img/" + process.env.LOGO;

/* === LOGIN [GET] === */
router.get('/', (req, res, next) => {

    let scripts = [
        // FONTAWESOME
        {script: '/lib/npm/all.min.js'},
    ];

    let styles = [
        {style: '/lib/npm/all.min.css'}
    ];

    let modules = [
        {module: '/lib/npm/popper.min.js'},
        {module: '/lib/npm/popper-utils.min.js'}
    ]
    // console.log("Din user.ctrl avem din req.body pe /login: ", req.body);
    res.render('login', {
        title:   "login",
        logoimg: LOGO_IMG,
        scripts,
        modules,
        styles
    });
});

// Utilitarelel pentru validarea parolei și emiterea JWT-ul!
let {issueJWT, validPassword} = require('./utils/password');
/* === LOGIN [POST] ===*/
router.post('/',  passport.authenticate('local'), async (req, res, next) => {
    // console.log("Din login.js avem din req.body pe /login: ", req.body, 'USER este ', req.user);
    res.redirect(301, '/');
});

module.exports = router;
