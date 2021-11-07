require('dotenv').config();
/* === DEPENDINȚE === */
const express = require('express');
const router  = express.Router();
const moment  = require('moment');
const logger  = require('../util/logger');
const Resursa = require('../models/resursa-red'); // Adu modelul resursei
const Mgmtgeneral = require('../models/MANAGEMENT/general'); // Adu modelul management

var content2html = require('./controllers/editorJs2HTML');
const redisClient = require('../redis.config');

// LOGO
let LOGO_IMG = "img/" + process.env.LOGO;

// INDECȘII ES7
const RES_IDX_ES7 = redisClient.get("RES_IDX_ES7", (err, reply) => {
    if (err) console.error;
    return reply;
});
const RES_IDX_ALS = redisClient.get("RES_IDX_ALS", (err, reply) => {
    if (err) console.error;
    return reply;
});
// Indexul de căutare
let idxRes = RES_IDX_ALS;

// === RESURSE PUBLICE ===
let renderPublicREDs = require('./controllers/public-reds.ctrl');
router.get('/', (req, res, next) => {

    async function clbkResPublice (req, res, next) {
        // Setări în funcție de template
        let filterMgmt = {focus: 'general'};
        let gensettings = await Mgmtgeneral.findOne(filterMgmt);
    
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
                {script: `${gensettings.template}/js/custom.js`},
                {script: `${gensettings.template}/js/resursepublice.js`}
            ],
            [
                {module: `${gensettings.template}/lib/npm/popper.min.js`},
                {module: `${gensettings.template}/js/main.mjs`}
            ],
            [
                {style: `${gensettings.template}/lib/npm/all.min.css`}
            ]
        ];

        renderPublicREDs(req, res, next, gensettings, Resursa, resurse, 'Public');
    };

    clbkResPublice(req, res, next).catch((error) => {
        console.log(error);
        logger(error);
        next(error);   
    });
});

// === RESURSĂ PUBLICĂ INDIVIDUALĂ ===
async function clbkResPublicaID (req, res, next) {
    let query = Resursa.findById(req.params.id).populate({path: 'competenteS'});
    query.then(resursa => {
        let scripts = [      
            // MOMENT.JS
            {script: `${gensettings.template}/lib/npm/moment-with-locales.min.js`},  
            // LOCALE
            {script: `${gensettings.template}/js/redincredadmin.js`}    
        ];
        
        if (resursa !== null) {
            // transformă obiectul document de Mongoose într-un obiect normal.
            const newObi = Object.assign({}, resursa._doc); // Necesar pentru că: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is

            // https://github.com/wycats/handlebars.js/blob/master/release-notes.md#v460---january-8th-2020
            newObi.dataRo = moment(newObi.date).locale('ro').format('LLL');
            newObi.content = content2html(resursa.content);
            // obiectul competenței specifice cu toate datele sale trebuie curățat.
            newObi.competenteS = newObi.competenteS.map(obi => {
                return Object.assign({}, obi._doc);
            });
            // adaug o nouă proprietate la rezultat cu o proprietate a sa serializată [injectare în client de date serializate]
            newObi.editorContent = JSON.stringify(resursa);
            
            // Necesar pentru că: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
            res.render(`resursa-publica_${gensettings.template}`, {
                template: `${gensettings.template}`,                
                title:     "O resursă",
                user:      req.user,
                logoimg:   `${gensettings.template}/${LOGO_IMG}`,
                csrfToken: req.csrfToken(),
                resursa:   newObi,
                scripts
            });
        } else {
            console.log(`Nu a putut fi adusă resursa!`);
        }
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    });
};
router.get('/:id', (req, res, next) => {
    clbkResPublicaID(req, res, next).catch((error) => {
        console.log(error);
        logger(error);
        next(error);  
    })
});

module.exports = router;
