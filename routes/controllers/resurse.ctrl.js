require('dotenv').config();

/* === DEPENDINȚE === */
const moment       = require('moment');
const redisClient  = require('../../redis.config');
const {v4: uuidv4} = require('uuid');
const logger       = require('../../util/logger');
/* === LIVRESQ - CONNECTOR === */
const LivresqConnect = require('../../models/livresq-connect').LivresqConnect;

/* === MODELE === */
const Resursa     = require('../../models/resursa-red'); // Adu modelul resursei
/* === HELPERE === */
// Cere helperul `checkRole` cu care verifică dacă există rolurile necesare accesului
let checkRole     = require('./checkRole.helper');
let content2html  = require('./editorJs2HTML');
// cere helperul pentru cache-ing
require('./cache.helper');
const {clearHash} = require('./cache.helper');
let cookieHelper  = require('./cookie2obj.helper');

// INDECȘII ES7
let RES_IDX_ES7 = '', RES_IDX_ALS = '', USR_IDX_ES7 = '', USR_IDX_ALS = '';
redisClient.get("RES_IDX_ES7", (err, reply) => {
    if (err) console.error;
    RES_IDX_ES7 = reply;
});
redisClient.get("RES_IDX_ALS", (err, reply) => {
    if (err) console.error;
    RES_IDX_ALS = reply;
});
redisClient.get("USR_IDX_ES7", (err, reply) => {
    if (err) console.error;
    USR_IDX_ES7 = reply;
});
redisClient.get("USR_IDX_ALS", (err, reply) => {
    if (err) console.error;
    USR_IDX_ALS = reply;
});

// CONSTANTE
const LOGO_IMG = "img/" + process.env.LOGO;

/* === AFIȘAREA RESURSELOR :: /resurse === */
exports.loadRootResources = function loadRootResources (req, res, next) {
    //  ACL
    let roles = ["user", "validator", "cred"];
    // Constituie un array cu rolurile care au fost setate pentru sesiunea în desfășurare. Acestea vin din coockie-ul clientului.
    let confirmedRoles = checkRole(req.session.passport.user.roles.rolInCRED, roles); 
    // console.log("Am următoarele roluri (resurse.ctrl) din req.session.passport: ", req.session.passport.user.roles.rolInCRED);

    // Adu-mi ultimele 8 resursele validate în ordinea ultimei intrări, te rog! Hey, hey, Mr. Serverman!
    let resursePublice = Resursa.find({'expertCheck': 'true'}).sort({"date": -1}).limit(8);

    // ===> SCRIPTURI GENERAL APLICABILE
    let scripts = [       
        // MOMENT.JS
        {script: '/lib/npm/moment-with-locales.min.js'},
        // HOLDER.JS
        {script: '/lib/npm/holder.min.js'},
    ];
    // ===> MODULE GENERAL APLICABILE
    let modules = [
        // LOCALE
        {module: '/js/redincredall.mjs'} 
    ];

    // REVIEW: Verifică dacă indexul de căutare există
    if (RES_IDX_ALS) {
        console.log('[resurse.ctrl.js]::Verificarea existenței alias-ului ES aduce val: ', RES_IDX_ALS);
    } else {
        //- FIXME: Tratează cazul în care nu există indexul alias în ES7 pentru că pur și simplu nu există index.
        let err = new Error('[resurse.ctrl.js]::Verificarea existenței alias-ului a dat chix');
        next(err);
    }
    
    /* ===> VERIFICAREA CREDENȚIALELOR <=== */
    if(req.session.passport.user.roles.admin){
        resursePublice.then((result) => {
            let newResultArr = result.map(function clbkMapResult (obi) {
                const newObi = Object.assign({}, obi._doc); // Necesar pentru că: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
                // https://github.com/wycats/handlebars.js/blob/master/release-notes.md#v460---january-8th-2020
                newObi.dataRo = moment(obi.date).locale('ro').format('LLL');
                // newResultArr.push(newObi);
                return newObi;
            });
            res.render('resurse', {
                title:        "RED::adm",
                user:         req.user,
                logoimg:      LOGO_IMG,
                csrfToken:    req.csrfToken(),
                resurse:      newResultArr,
                activeResLnk: true,
                resIdx:       RES_IDX_ALS,
                scripts,
                modules
            });
        }).catch((err) => {
            if (err) {
                console.log(JSON.stringify(err.body, null, 2));
                logger.error(err);
                next(err);
            }
        });
    } else if (confirmedRoles.length > 0) { // când ai cel puțin unul din rolurile menționate în roles, ai acces la formularul de trimitere a resursei.
        // promiseResPub.then((result) => {
        resursePublice.then(function (result) {
            let newResultArr = result.map(function clbkMapResult (obi) {
                const newObi = Object.assign({}, obi._doc); // Necesar pentru că: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
                // https://github.com/wycats/handlebars.js/blob/master/release-notes.md#v460---january-8th-2020
                newObi.dataRo = moment(obi.date).locale('ro').format('LLL');
                // newResultArr.push(newObi);
                return newObi;
            });
        
            res.render('resurse', {
                title:        "Resurse publice",
                user:         req.user,
                logoimg:      LOGO_IMG,
                csrfToken:    req.csrfToken(),                
                resurse:      newResultArr,
                activeResLnk: true,
                resIdx:       RES_IDX_ALS,
                scripts
            });
        }).catch((err) => {
            if (err) {
                console.log(JSON.stringify(err.body, null, 2));
                logger.error(err);
                next(err);
            }
        });
    } else {
        res.redirect('/401');
    }
    // console.log(req.session.passport.user.roles); // { rolInCRED: [], unit: [], admin: true }
};

/* AFIȘAREA UNEI SINGURE RESURSE / ȘTERGERE / EDITARE */
exports.loadOneResource = function loadOneResource (req, res, next) {
    let scripts = [
        // MOMENT.JS
        {script: '/lib/npm/moment-with-locales.min.js'},
        // EDITOR.JS
        {script: '/lib/editorjs/editor.js'},
        {script: '/lib/editorjs/header.js'},
        {script: '/lib/editorjs/paragraph.js'},
        {script: '/lib/editorjs/list.js'},
        {script: '/lib/editorjs/image.js'},
        {script: '/lib/editorjs/table.js'},
        {script: '/lib/editorjs/attaches.js'},
        {script: '/lib/editorjs/embed.js'},
        {script: '/lib/editorjs/code.js'},
        {script: '/lib/editorjs/quote.js'},
        {script: '/lib/editorjs/inlinecode.js'},
        // HOLDER.JS
        {script: '/lib/npm/holder.min.js'}    
    ];

    let modules = [
        // LOCALS
        {module: '/js/uploader.mjs'},
        // LOCAL 
        {module: '/js/cred-res.js'}                
    ];

    function renderRED (resursa) {
        if (resursa.id) {
            // transformă obiectul document de Mongoose într-un obiect normal.
            const obi = Object.assign({}, resursa._doc); // Necesar pentru că: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is

            // obiectul competenței specifice cu toate datele sale trebuie curățat.
            obi.competenteS = obi.competenteS.map(obi => {
                return Object.assign({}, obi._doc);
            });

            // adaug o nouă proprietate la rezultat cu o proprietate a sa serializată [injectare în client a întregii înregistrări serializate]
            obi.editorContent = JSON.stringify(resursa);

            // resursa._doc.content = editorJs2html(resursa.content);
            let localizat = moment(obi.date).locale('ro').format('LLL');
            obi.dataRo = `${localizat}`; // formatarea datei pentru limba română.            

            // Array-ul activităților modificat
            let activitatiRehashed = obi.activitati.map((elem) => {
                let sablon = /^([aA-zZ])+\d/g;
                let cssClass = elem[0].match(sablon);
                let composed = '<span class="' + cssClass[0] + 'data-code="' + elem[0] + '">' + elem[1] + '</span>';
                return composed;
            });
            
            obi.activitati = activitatiRehashed;

            let data = {
                uuid: obi.uuid,
                publisher: process.env.PUBLISHER
            };            

            res.render('resursa-cred', {                
                title:     obi.title,
                user:      req.user,
                logoimg:   LOGO_IMG,
                csrfToken: req.csrfToken(),
                resursa:   obi,
                data,
                modules,
                scripts
            });
        }
    };

    Resursa.findById(req.params.id).populate({path: 'competenteS'})
        .then(renderRED).catch(err => {
            if (err) {
                console.log(JSON.stringify(err.body, null, 2));
                logger.error(err);
                next(err);
            }
        });
};

/* FORM DESCRIERE RESURSE (ADAUGĂ) */
exports.describeResource = function describeResource (req, res, next) {
    const cookieObj = cookieHelper.cock2obj(req.headers.cookie);
    // Unică sursă de identificator
    let uuid = uuidv4();
    // console.log("Sesiunea de la /resurse/adaugă arată așa: ", req.session);
    // pentru evitarea dependițelor din CDN-uri, se vor încărca dinamic scripturile necesare generării editorului
    let scripts = [
        // JQuery
        // {script: '/lib/npm/jquery.min.js'},
        // Toast
        // {script: '/lib/npm/jquery.toast.min.js'},
        // Bootstrap 4
        {script: '/lib/npm/bootstrap.bundle.min.js'},
        // Datatables
        {script: '/lib/npm/jquery.dataTables.min.js'},
        {script: '/lib/npm/dataTables.bootstrap4.min.js'},
        {script: '/lib/npm/dataTables.select.min.js'},
        {script: '/lib/npm/dataTables.buttons.min.js'},
        {script: '/lib/npm/dataTables.responsive.min.js'},        
        // HELPER DETECT URLS or PATHS
        {script: '/js/check4url.js'}
    ];

    let modules = [
        // EDITOR.JS
        {module: '/lib/editorjs/editor.js'},
        {module: '/lib/editorjs/header.js'},
        {module: '/lib/editorjs/paragraph.js'},
        {module: '/lib/editorjs/checklist.js'},
        {module: '/lib/editorjs/list.js'},
        {module: '/lib/editorjs/image.js'},
        {module: '/lib/editorjs/embed.js'},
        {module: '/lib/editorjs/code.js'},
        {module: '/lib/editorjs/quote.js'},
        {module: '/lib/editorjs/inlinecode.js'},
        {module: '/lib/editorjs/table.js'},
        {module: '/lib/editorjs/attaches.js'},
        {module: '/lib/editorjs/ajax.js'},
        // JQuery
        {module: '/lib/npm/jquery.min.js'},
        // Toast
        {module: '/lib/npm/jquery.toast.min.js'},
        // MOTORUL FORM-ULUI
        {module: '/js/custom.js'},
        {module: '/js/uploader.mjs'},
        {module: '/js/form01adres.mjs'}        
    ];

    let styles = [
        // FONTAWESOME
        {style: '/lib/npm/all.min.css'},
        // JQUERY TOAST
        {style: '/lib/npm/jquery.toast.min.css'},
        // BOOTSTRAP
        {style: '/lib/npm/bootstrap.min.css'},
        // DATATABLES
        {style: '/lib/npm/jquery.dataTables.min.css'},
        {style: '/lib/npm/buttons.dataTables.min.css'},
        {style: '/lib/npm/dataTables.bootstrap4.min.css'},
        {style: '/lib/npm/responsive.dataTables.min.css'},
        {style: '/lib/npm/select.dataTables.min.css'}
    ];

    let data = {
        uuid: uuid,
        publisher: process.env.PUBLISHER
    };

    // roluri pe care un cont le poate avea în proiectul CRED.
    let roles = ["user", "cred", "validator"]; // _REVIEW: când vei permite tuturor să adauge resurse, introdu și `user`!!
    let confirmedRoles = checkRole(req.session.passport.user.roles.rolInCRED, roles);
    // console.log(req.session.passport.user.roles.rolInCRED);

    /* === VERIFICAREA CREDENȚIALELOR === */
    if(req.session.passport.user.roles.admin){
        let user = req.session.passport.user;
        //- FIXME: Renunță la acest artificiu pentru conturile locale de îndată ce unifici localele cu profilurile Google.
        let given_name =  "Jane" || user.googleProfile.given_name;
        let family_name = "Doe"  || user.googleProfile.family_name;
        
        /* === LIVRESQ CONNECTOR === */
        let url = new LivresqConnect().prepareProjectRequest(user.email, given_name, family_name);
        if(!url.startsWith("http")) url = "#";

        // Dacă avem un admin, atunci oferă acces neîngrădit
        res.render('adauga-res', {            
            title:     "Adauga",
            user:      req.user,
            logoimg:   LOGO_IMG,
            csrfToken: req.csrfToken(),
            styles,
            modules,
            scripts,
            data,
            livresqProjectRequest: url /* === LIVRESQ CONNECTOR === */
        });
        // trimite informații despre user care sunt necesare formularului de încărcare pentru autocompletare
    } else if (confirmedRoles.length > 0) { // când ai cel puțin unul din rolurile menționate în roles, ai acces la formularul de trimitere a resursei.
        
        let user = req.session.passport.user;
        // -FIXME: Introdu în formularul de creare cont câmpurile name și surname pentru a elimina artificiul făcut pentru integrarea cu Livresq
        let given_name = 'Jane' || user.googleProfile.given_name;
        let family_name = 'Doe' || user.googleProfile.family_name;
        
        /* === LIVRESQ CONNECTOR === */
        let url = new LivresqConnect().prepareProjectRequest(user.email, given_name, family_name);
        if(!url.startsWith("http")) url = "#";

        res.render('adauga-res', {            
            title:     "Adauga",
            user:      req.user,
            logoimg:   LOGO_IMG,
            csrfToken: req.csrfToken(),
            styles,
            modules,
            scripts,
            data,
            livresqProjectRequest: url /* === LIVRESQ CONNECTOR === */
        });
    } else {
        res.redirect('/401');
    }
};

/* ÎNCĂRCAREA RESURSELOR (inactiv) */
exports.uploadResource = function uploadResource (req, res, next) {
    let roles = ["user", "educred", "validator"];

    let confirmedRoles = checkRole(req.session.passport.user.roles.rolInCRED, roles);

    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('Nu s-a încărcat nimic.');
    }

    /* === VERIFICAREA CREDENȚIALELOR === */
    if(req.session.passport.user.roles.admin){
        // Dacă avem un admin, atunci oferă acces neîngrădit
        // putFilesInBag(req.files, req.body);
        let data = [];
        req.files.forEach((imagine) => {
            // console.log(Object.keys(imagine[key]));
            let img = req.files.imagine[key];
            img.mv('./repo/' + img.name);

            data.push({
                name: img.name,
                mimetype: img.mimetype,
                size: img.size
            });
        });
        res.send({
            status: true,
            message: 'Files are uploaded',
            data: data
        });

    } else if (confirmedRoles.length > 0) {
        // când ai cel puțin unul din rolurile menționate în roles, ai acces la formularul de trimitere a resursei.

    } else {
        res.redirect('/401');
    }
};
