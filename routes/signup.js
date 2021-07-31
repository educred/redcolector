require('dotenv').config();
/* ==== DEPENDINȚE ==== */
const express    = require('express');
const router     = express.Router();
const passport   = require('passport');
const mongoose   = require('mongoose');
const UserSchema = require('../models/user');
const logger     = require('../util/logger');
// Încarcă controlerul necesar tratării rutelor de autentificare
const UserPassport = require('./controllers/user.ctrl')(passport);
const UserDetails  = mongoose.model('users', UserSchema, 'users');

// CONSTANTE
const LOGO_IMG = "img/" + process.env.LOGO;

/* === SIGNUP [GET] ===*/
router.get('/', function clbkSignUpGet (req, res, next) {
    let scripts = [
        // LOCALE
        {script: '/js/signup.js'} 
    ];
    res.render('signup', {
        title:   "Signup RED",
        style:   "/lib/fontawesome/css/fontawesome.min.css",
        logoimg: LOGO_IMG,
        scripts
    });
});

/* === SIGNUP [POST] ===*/
router.post('/', function clbkPostSignUp (req, res, next) {
    // Crearea contului!!!
    // metoda este atașată de pluginul `passport-local-mongoose` astfel: schema.statics.register
    UserDetails.register(new UserDetails({
        _id: mongoose.Types.ObjectId(),
        username: req.body.email, 
        email: req.body.email,
        roles: {
            admin: false,
            public: false,
            rolInCRED: ['general']
        }
    }), req.body.password, function clbkAuthLocal (err, user) {
        if (err) {
            logger.error(err);
            console.log('[signup::post]', err);
        };
        // dacă nu este nicio eroare, testează dacă s-a creat corect contul, făcând o autentificare
        var authenticate = UserDetails.authenticate();
        authenticate(req.body.email, req.body.password, function clbkAuthTest (err, result) {
            if (err) {
                logger.error(err);
                console.error('[signup::post::authenticate]', err);
                return next(err);
            }
            // în cazul în care autentificarea a reușit, trimite userul să se logheze.
            if (result) {
                res.redirect('/login');
            }
        });
    });
});

module.exports = router;