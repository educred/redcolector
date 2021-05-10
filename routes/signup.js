require('dotenv').config();
/* ==== DEPENDINȚE ==== */
const express    = require('express');
const router     = express.Router();
const passport   = require('passport');
const mongoose   = require('mongoose');
const UserSchema = require('../models/user');
const connectEnsureLogin = require('connect-ensure-login');
// Încarcă controlerul necesar tratării rutelor de autentificare
const UserPassport = require('./controllers/user.ctrl')(passport);
const UserDetails  = mongoose.model('users', UserSchema, 'users');
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

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
    // aici creezi contul!
    UserDetails.register(new UserDetails({
        _id: mongoose.Types.ObjectId(),
        username: req.body.email, 
        email: req.body.email,
        roles: {
            admin: false,
            public: false,
            rolInCRED: ['general']
        }
    }), req.body.password, function (err, user) {
        if (err) console.error(err);
        var authenticate = UserDetails.authenticate();
        authenticate(req.body.email, req.body.password, function(err, result) {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (result) {
                res.redirect('/login');
            }
        });
    });
});

module.exports = router;