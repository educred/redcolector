require('dotenv').config();
const express = require('express');
const router  = express.Router();
// Încarcă mecanismele de verificare ale rolurilor
let makeSureLoggedIn = require('connect-ensure-login');
let checkRole = require('./controllers/checkRole.helper');

// CONSTANTE
const LOGO_IMG = "img/" + process.env.LOGO;

/* === Sistem de asistență - HELP === */
router.get('/', makeSureLoggedIn.ensureLoggedIn(), function clbkHelp (req, res) {
    res.render('help', {
        user:      req.user,
        title:     "Asistență",
        logoimg:   LOGO_IMG,
        csrfToken: req.csrfToken()
    });
});

module.exports = router;