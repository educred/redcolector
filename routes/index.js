require('dotenv').config();
const express  = require('express');
const router   = express.Router();

const Resursa  = require('../models/resursa-red');              // Adu modelul resursei
const Mgmtgeneral = require('../models/MANAGEMENT/general');    // Adu modelul management
const logger   = require('../util/logger');

/* === LANDING :: / === */
let index = require('./controllers/index.ctrl');    // adu funcția `renderPublic` din `/controllers`.
router.get('/', (req, res, next) => {
    
    async function clbkRootRoute (req, res, next) {
        
        // Setări în funcție de template
        let filterMgmt = {focus: 'general'};
        let gensettings = await Mgmtgeneral.findOne(filterMgmt);

        // scripts, modules, styles
        const resurse = [
            [
                // MOMENT.JS
                {script: `moment/min/moment-with-locales.min.js`},
                // HOLDERJS
                {script: `holderjs/holder.min.js`},
                // FONTAWESOME
                {script: `${gensettings.template}/lib/npm/all.min.js`},
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
                limit: 9
            }
        };

        // Afișează resursele găsite
        index(req, res, next, gensettings, Resursa, modelOpts, resurse, 'Acasă');
    };
    clbkRootRoute(req, res, next).catch((error) => {
        console.log(error);
        logger.error(error);
        next(error);
    })
});

module.exports = router;