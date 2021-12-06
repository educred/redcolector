require('dotenv').config();
const express  = require('express');
const router   = express.Router();
const moment   = require('moment');

const Resursa  = require('../models/resursa-red');              // Adu modelul resursei
const Mgmtgeneral = require('../models/MANAGEMENT/general');    // Adu modelul management
const logger   = require('../util/logger');

/* === LANDING :: / === */
let renderPublic = require('./controllers/public.ctrl');    // adu funcția `renderPublic` din `/controllers`.
router.get('/', (req, res, next) => {
    async function clbkRootRoute (req, res, next) {

        // Setări în funcție de template
        let filterMgmt = {focus: 'general'};
        let gensettings = await Mgmtgeneral.findOne(filterMgmt);

        // scripts, modules, styles
        const resurse = [
            [
                //JQUERY
                {script: `${gensettings.template}/lib/npm/jquery.slim.min.js`},
                {script: `${gensettings.template}/lib/npm/jquery.waypoints.min.js`},
                // MOMENT.JS
                {script: `${gensettings.template}/lib/npm/moment-with-locales.min.js`}, 
                // FONTAWESOME
                {script: `${gensettings.template}/lib/npm/all.min.js`},
                // HOLDERJS
                {script: `${gensettings.template}/lib/npm/holder.min.js`},
                // BOOTSTRAP          
                {script: `${gensettings.template}/lib/npm/bootstrap.bundle.min.js`},
                // LOCALE
                {script: `${gensettings.template}/js/custom.js`}
                // {script: `${gensettings.template}/js/IndexInfotoken.js`}
            ],
            [
                {module: `${gensettings.template}/lib/npm/popper.min.js`},
                {module: `${gensettings.template}/js/main.mjs`}
            ],
            [
                {style: `${gensettings.template}/lib/npm/all.min.css`}
            ]
        ];

        /* 
        * Configurări pentru `Model.find`
        * Adu ultimele 8 RESURSE pe landing cu ultimele resurse introduse afișate primele
        * */
        modelOpts = {
            projection: {generalPublic: true},
            queryOpts: {
                sort: {date: -1},
                limit: 8
            }
        };

        // Afișează resursele găsite
        renderPublic(req, res, next, gensettings, Resursa, modelOpts, resurse, 'Acasă');
    };
    clbkRootRoute(req, res, next).catch((error) => {
        console.log(error);
        logger.error(error);
        next(error);
    })
});

module.exports = router;