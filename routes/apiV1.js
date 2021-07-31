require('dotenv').config();
/* === DEPENDINȚE === */
const express = require('express');
const router  = express.Router();
const passport= require('passport');

// Cere gestionarul pentru versiunea 1
let {getREDs, getRED, postRED, putRED, delRED, userLogin, createUser} = require('./api/v1');

router
    .route('/')
    .get(getREDs)
    .post(postRED);

router
    .route('/:id')
    .get(getRED)
    .put(putRED)
    .delete(delRED);

router
    .route('/user/login')
    .post(passport.authenticate('local', { failureRedirect: '/login'}), userLogin);

module.exports = router;