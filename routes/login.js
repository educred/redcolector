require('dotenv').config();
/* === DEPENDINȚE === */
const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const jwt      = require('jsonwebtoken');
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

// Emite JWT-ul!
let {issueJWT} = require('./utils/password');
/* === LOGIN [POST] ===*/
router.post('/',  async (req, res, next) => {
    console.log("Din login.js avem din req.body pe /login: ", req.body, 'USER este ', req.user, req.cookies);

    passport.authenticate('login', async (err, user, info) => {
        try {
            if(err || !user) {
                const error = new Error('Ceva nu funcționează');
                return next(error);
            }
            req.login(user, {session: false}, async (error) => {
                if (error) return next(error);
                const body = {_id: user._id, email: user.email};
                const token = jwt.sign({user: body}, process.env.JWT_SECRET);
                return res.json({token});
            });
        } catch(err) {
            return next(err);
        }
    })(req, res, next);



    // res.status(200).send().json({token: issueJWT({_id:})});
    // res.status(200).json({token: 'Aici va fi'});
    res.redirect('/');
});

module.exports = router;
