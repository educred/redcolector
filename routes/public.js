require('dotenv').config();
/* === DEPENDINȚE === */
const express = require('express');
const router  = express.Router();
const moment  = require('moment');
const logger  = require('../util/logger');
const Resursa = require('../models/resursa-red'); // Adu modelul resursei
const Mgmtgeneral = require('../models/MANAGEMENT/general'); // Adu modelul management
let {getStructure} = require('../util/es7');

var content2html = require('./controllers/editorJs2HTML');
const redisClient = require('../redis.config');

// LOGO
let LOGO_IMG = "img/" + process.env.LOGO;

// INDECȘII ES7
let RES_IDX_ES7 = '', RES_IDX_ALS = '', USR_IDX_ES7 = '', USR_IDX_ALS = '';
getStructure().then((val) => {
    // console.log(`Am obținut `, val);
    USR_IDX_ALS = val.USR_IDX_ALS;
    USR_IDX_ES7 = val.USR_IDX_ES7;
    RES_IDX_ALS = val.RES_IDX_ALS;
    RES_IDX_ES7 = val.RES_IDX_ES7;
}).catch((error) => {
    console.log(`[resurse.ctrl.js::getStructure] nu a adus datele`, error);
    logger.error(error);
});

// Indexul de căutare
let idxRes = RES_IDX_ALS;

// === RESURSE PUBLICE ===
let renderPublicREDs = require('./controllers/public.ctrl');
router.get('/', (req, res, next) => {

    async function clbkResPublice (req, res, next) {
        // Setări în funcție de template
        let filterMgmt = {focus: 'general'};
        let gensettings = await Mgmtgeneral.findOne(filterMgmt);
    
        const resurse = [
            [
                //JQUERY
                {script: `${gensettings.template}/lib/npm/jquery.min.js`},
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
                        // EDITOR.JS
                {module: `${gensettings.template}/lib/editorjs/editor.js`},
                {module: `${gensettings.template}/lib/editorjs/header.js`},
                {module: `${gensettings.template}/lib/editorjs/paragraph.js`},
                {module: `${gensettings.template}/lib/editorjs/checklist.js`},
                {module: `${gensettings.template}/lib/editorjs/list.js`},
                {module: `${gensettings.template}/lib/editorjs/image.js`},
                {module: `${gensettings.template}/lib/editorjs/embed.js`},
                {module: `${gensettings.template}/lib/editorjs/code.js`},
                {module: `${gensettings.template}/lib/editorjs/quote.js`},
                {module: `${gensettings.template}/lib/editorjs/inlinecode.js`},
                {module: `${gensettings.template}/lib/editorjs/table.js`},
                {module: `${gensettings.template}/lib/editorjs/attaches.js`},
                {module: `${gensettings.template}/lib/editorjs/ajax.js`},
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

        renderPublicREDs(req, res, next, gensettings, Resursa, modelOpts, resurse, 'Public');
    };

    clbkResPublice(req, res, next).catch((error) => {
        console.log(error);
        logger(error);
        next(error);   
    });
});

// === RESURSĂ PUBLICĂ INDIVIDUALĂ ===
async function clbkResPublicaID (req, res, next) {
    // Setări în funcție de template
    let filterMgmt = {focus: 'general'};    
    let gensettings = await Mgmtgeneral.findOne(filterMgmt);
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
