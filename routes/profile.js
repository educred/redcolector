require('dotenv').config();
/* === DEPENDINȚE === */
const path        = require('path');
const fs          = require('fs');
const archiver    = require('archiver');
const globby      = require('globby');
const util        = require('util');
const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const moment      = require('moment');
const logger      = require('../util/logger');
const redisClient = require('../redis.config');

// Încarcă mecanismele de verificare ale rolurilor
let makeSureLoggedIn = require('connect-ensure-login');
let checkRole        = require('./controllers/checkRole.helper');
// MODELE
const Resursa    = require('../models/resursa-red'); // Adu modelul resursei
const Mgmtgeneral = require('../models/MANAGEMENT/general'); // Adu modelul management
// CONFIGURARI ACCES SERVICII
const esClient   = require('../elasticsearch.config');
// HELPERI
const schema     = require('../models/resursa-red-es7');
const ES7Helper  = require('../models/model-helpers/es7-helper');
let editorJs2TXT = require('./controllers/editorJs2TXT');
let editorJs2HTMLstatic = require('./controllers/editorJs2HTMLstatic');
let walk = require('../util/walk');

// LOGO
let LOGO_IMG = "img/" + process.env.LOGO;

// INDECȘII ES7
let RES_IDX_ES7 = '', RES_IDX_ALS = '';

redisClient.get("RES_IDX_ES7", (err, reply) => {
    if (err) console.error;
    RES_IDX_ES7 = reply;
});
redisClient.get("RES_IDX_ALS", (err, reply) => {
    if (err) console.error;
    RES_IDX_ALS = reply;
});

/* === PROFILUL PROPRIU === */
async function clbkProfile (req, res) {
    // Setări în funcție de template
    let filterMgmt = {focus: 'general'};
    let gensettings = await Mgmtgeneral.findOne(filterMgmt);

    res.render(`profile_${gensettings.template}`, {
        template:     `${gensettings.template}`,
        title:        "Profil",
        user:         req.user,
        logoimg:      `${gensettings.template}/${LOGO_IMG}`,
        csrfToken:    req.csrfToken(),
        activePrfLnk: true
    });
};
router.get('/', makeSureLoggedIn.ensureLoggedIn(), (req, res, next) => {
    clbkProfile(req, res, next).catch((error) => {
        console.log(error);
        logger(error);
        next(error);    
    })
});

/* === ACCESAREA PROPRIILOR RESURSE :: /resurse === */
router.get('/resurse', makeSureLoggedIn.ensureLoggedIn(), (req, res, next) => {

    async function clbkProfRes (req, res) {
        // Setări în funcție de template
        let filterMgmt = {focus: 'general'};
        let gensettings = await Mgmtgeneral.findOne(filterMgmt);
    
        /* === RESURSELE NECESARE LA RANDARE === */
        let scripts = [       
            // MOMENT.JS
            {script: `${gensettings.template}/lib/npm/moment-with-locales.min.js`},
            // HOLDERJS
            {script: `${gensettings.template}/lib/npm/holder.min.js`},
            // LOCAL
            //{script: '/js/form02log.js`},
            // DATATABLES
            {script: `${gensettings.template}/lib/npm/jquery.dataTables.min.js`},
            {script: `${gensettings.template}/lib/npm/dataTables.bootstrap4.min.js`},
            {script: `${gensettings.template}/lib/npm/dataTables.select.min.js`},
            {script: `${gensettings.template}/lib/npm/dataTables.buttons.min.js`},
            {script: `${gensettings.template}/lib/npm/dataTables.responsive.min.js`},
            // TIMELINE 3
            {script: `${gensettings.template}/lib/timeline3/js/timeline.js`}            
        ];
    
        let styles = [
            {style: `${gensettings.template}/lib/npm/jquery.dataTables.min.css`},
            {style: `${gensettings.template}/lib/npm/responsive.dataTables.min.css`},
            {style: `${gensettings.template}/lib/npm/dataTables.bootstrap4.min.css`}
        ];
    
        let modules = [
            // MAIN
            {module: `${gensettings.template}/js/main.mjs`},
            {module: `${gensettings.template}/js/res-visuals-user.mjs`}
        ];

        /**
         * Funcție cu rol de callback
         * Transformă obiectul primit într-un POJO cu date formatate cu moment
         * @param {Object} obi 
         */
        function clbkMapResult (obi) {
            const newObi = Object.assign({}, obi._doc); // Necesar pentru că: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
            // https://github.com/wycats/handlebars.js/blob/master/release-notes.md#v460---january-8th-2020
            newObi.dataRo = moment(obi.date).locale('ro').format('LLL');
            // newResultArr.push(newObi);
            return newObi;
        }
    
        // Afișează doar ultimele 8 resurse introduse
        Resursa.find({idContributor: req.user._id}).sort({"date": -1}).limit(8).then((result) => {
    
            // transformă documentele Mongoose în POJOs cu dată formatată
            let newResultArr = result.map(clbkMapResult);
    
            /* === RANDEAZĂ RESURSELE ÎN PROFIL === */
            res.render(`resurse-profil_${gensettings.template}`, {
                template: `${gensettings.template}`,               
                title:     "Profil",
                user:      req.user,
                logoimg:   `${gensettings.template}/${LOGO_IMG}`,
                csrfToken: req.csrfToken(),
                resurse:   newResultArr,
                scripts,
                modules,
                styles,
                activeAdmLnk: true
            });
        }).catch((error) => {
            console.error('[routes::profile::/profile/resurse] Eroare care apare la afișarea resurselor este: ', error);
            logger.error(error);
        });
    };

    clbkProfRes(req, res, next).catch((error) => {
        console.log(error);
        logger(error);
        next(error); 
    })
});

/* === VALIDARE / PUBLICARE /ȘTERGERE /EDITARE :: /resurse/:idres === */
async function clbkProfResID (req, res, next) {
    // Setări în funcție de template
    let filterMgmt = {focus: 'general'};
    let gensettings = await Mgmtgeneral.findOne(filterMgmt);
    // Adu înregistrarea resursei cu toate câmpurile referință populate deja
    // const editorJs2html = require('./controllers/editorJs2HTML');
    let scripts = [
        // MOMENT.JS
        {script: `${gensettings.template}/lib/npm/moment-with-locales.min.js`},
        // DOWNLOADJS
        {script: `${gensettings.template}/lib/download.js`}
    ];

    let modules = [
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
        // MAIN
        {module: `${gensettings.template}/js/main.mjs`},
        // REEDIT RES
        {module: `${gensettings.template}/js/personal-res.mjs`},
        // GITGRAPH
        {module: `${gensettings.template}/lib/gitgraph.umd.js`}
    ];

    let styles = [
        // FONTAWESOME
        {style: `${gensettings.template}/lib/npm/all.min.css`},
        // JQUERY TOAST
        {style: `${gensettings.template}/lib/npm/jquery.toast.min.css`},
        // BOOTSTRAP
        {style: `${gensettings.template}/lib/npm/bootstrap.min.css`}
    ];

    let roles = ["user", "cred", "validator"];// userul poate fi unul din roluri
    let confirmedRoles = checkRole(req.session.passport.user.roles.rolInCRED, roles);

    // caută resursa în bază
    // reformatare obiect resursă și căutarea corespondentului în Elasticsearch cu reindexare, dacă nu există în bază, șterge ghost-ul din ES
    Resursa.findById(req.params.idres).populate({path: 'competenteS'}).then((resursa) => {   
        /* === Resursa încă există în MongoDB === */
        if (resursa.id !== null) {
            // transformă obiectul document de Mongoose într-un obiect normal.
            const obi = Object.assign({}, resursa._doc); // Necesar pentru că: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is

            // obiectul competenței specifice cu toate datele sale trebuie curățat.
            obi.competenteS = obi.competenteS.map(obi => {
                return Object.assign({}, obi._doc);
            });

            // adaug o nouă proprietate la rezultat cu o proprietate a sa serializată [injectare în client a întregii înregistrări serializate]
            obi.editorContent = JSON.stringify(resursa);

            // resursa._doc.content = editorJs2html(resursa.content);
            obi.dataRo = moment(obi.date).locale('ro').format('LLL');   // formatarea datei pentru limba română.            

            // Array-ul activităților modificat
            obi.activitati = obi.activitati.map((elem) => {
                let sablon = /^([aA-zZ])+\d/g;
                let cssClass = elem[0].match(sablon);
                let composed = '<span class="' + cssClass[0] + 'data-code="' + elem[0] + '">' + elem[1] + '</span>';
                return composed;
            });

            // Dacă nu este indexată în Elasticsearch deja, indexează aici!
            // esClient.exists({
            //     index: RES_IDX_ALS,
            //     id: req.params.idres
            // }).then(resFromIdx => {
            //     /* DACĂ RESURSA NU ESTE INDEXATĂ, introdu-o în indexul Elasticsearch */
            //     if(resFromIdx.statusCode === 404){
            //         // verifică dacă există conținut
            //         var content2txt = '';
            //         if ('content' in obi) {
            //             content2txt = editorJs2TXT(obi.content.blocks); // transformă obiectul în text
            //         }
            //         // indexează documentul
            //         const data = {
            //             id:               obi._id,
            //             date:             obi.date,
            //             idContributor:    obi.idContributor,
            //             emailContrib:     obi.emailContrib,
            //             uuid:             obi.uuid,
            //             autori:           obi.autori,
            //             langRED:          obi.langRED,
            //             title:            obi.title,
            //             titleI18n:        obi.titleI18n,
            //             arieCurriculara:  obi.arieCurriculara,
            //             level:            obi.level,
            //             discipline:       obi.discipline,
            //             disciplinePropuse:obi.disciplinePropuse,
            //             competenteGen:    obi.competenteGen,
            //             rol:              obi.rol,
            //             abilitati:        obi.abilitati,
            //             materiale:        obi.materiale,
            //             grupuri:          obi.grupuri,
            //             domeniu:          obi.demersuri,
            //             spatii:           obi.spatii,
            //             invatarea:        obi.invatarea,
            //             description:      obi.description,
            //             dependinte:       obi.dependinte,
            //             coperta:          obi.coperta,
            //             content:          content2txt,
            //             bibliografie:     obi.bibliografie,
            //             contorAcces:      obi.contorAcces,
            //             generalPublic:    obi.generalPublic,
            //             contorDescarcare: obi.contorDescarcare,
            //             etichete:         obi.etichete,
            //             utilMie:          obi.utilMie,
            //             expertCheck:      obi.expertCheck
            //         };

            //         ES7Helper.searchIdxAndCreateDoc(schema, data, RES_IDX_ES7, RES_IDX_ALS); // https://stackoverflow.com/questions/50609417/elasticsearch-error-cluster-block-exception-forbidden-12-index-read-only-all                  
            //     }
            //     return resFromIdx;
            // }).catch(err => {
            //     console.error(err);
            // });
            return obi;
        } else {
            // Caută resursa și în Elasticsearch. Dacă există indexată, dar a fost ștearsă din MongoDB, șterge-o din indexare, altfel va apărea la căutare
            esClient.exists({
                index: RES_IDX_ALS,
                id: req.params.idres
            }).then(resFromIdx => {
                // console.log(resFromIdx);
                if(resFromIdx.statusCode !== 404){
                    esClient.delete({
                        id: req.params.idres,
                        index: RES_IDX_ALS
                    }).then(dead => {
                        // console.log(dead);
                        // rre('mesaje', `Resursa era încă indexată și am șters-o acum.`);
                    }).catch(err => {
                        // rre('mesaje', `Am încercat să șterg din index, dar: ${err}`);
                    });                        
                }
                return resFromIdx;
            }).catch(err => {
                console.error(JSON.stringify(error, null, 2));
            });
            return null;
        }
    }).then((resursa) => {
        /* === ADMIN === */
        if(resursa !== null && req.session.passport.user.roles.admin) {
            
            // Adaugă mecanismul de validare al resursei
            if (resursa.expertCheck) {
                resursa.validate = `<input type="checkbox" id="valid" class="expertCheck" checked>`;
            } else {
                resursa.validate = `<input type="checkbox" id="valid" class="expertCheck">`;
            }
            // Adaugă checkbox pentru zona publică
            if (resursa.generalPublic) {
                resursa.genPub = `<input type="checkbox" id="public" class="generalPublic" checked>`;
            } else {
                resursa.genPub = `<input type="checkbox" id="public" class="generalPublic">`;
            }
            // Setul de date va fi disponibil în `data-content` ca string JSON. Este trimis cu helperul `hbs.registerHelper('json', cb)` definit în app.js
            // Acest lucru este necesar pentru a reedita resursa în client.
            res.render(`resursa-admin_${gensettings.template}`, {
                template: `${gensettings.template}`,
                title:     "Admin",
                user:      req.user,                
                logoimg:   `${gensettings.template}/${LOGO_IMG}`,
                csrfToken: req.csrfToken(),
                resursa,
                scripts,
                modules,
                styles
            });
        /* === VALIDATOR === */
        } else if (confirmedRoles.includes('validator')) {
            // Adaugă doar checkbox de validare
            if (resursa.expertCheck) {
                resursa.validate = `<input type="checkbox" id="valid" class="expertCheck" checked>`;
            } else {
                resursa.validate = `<input type="checkbox" id="valid" class="expertCheck">`;
            }
            res.render(`resursa-validator_${gensettings.template}`, {
                template:  `${gensettings.template}`,      
                title:     "Validator",
                user:      req.user,               
                logoimg:   `${gensettings.template}/${LOGO_IMG}`,
                csrfToken: req.csrfToken(),
                resursa,
                scripts,
                modules,
                styles
            });
        /* === ROLURI ÎN CRED === */
        } else if (confirmedRoles.length > 0) { 
            // când ai cel puțin unul din rolurile menționate în roles, ai acces la formularul de trimitere a resursei.
            res.render(`resursa_${gensettings.template}`, { 
                template:  `${gensettings.template}`,                
                title:     "User",
                user:      req.user,
                logoimg:   `${gensettings.template}/${LOGO_IMG}`,
                csrfToken: req.csrfToken(),
                resursa,
                scripts,
                modules,
                styles
            });
        /* === NU FACI PARTE DIN CRED === */
        } else {
            res.redirect('/401');
        }
    }).catch((err) => {
        if (err) {
            console.error(err);
            logger.error(err);
            // rre('mesaje', `Nu pot să afișez resursa. Este posibil să nu mai existe! Eroare: ${err}`);
            res.redirect('/administrator/reds');
        }
    });
};
router.get('/:idres', makeSureLoggedIn.ensureLoggedIn(), (req, res, next) => {
    clbkProfResID(req, res, next).catch((error) => {
        console.log(error);
        logger.error(error);
        next(error); 
    })
});

/* === DESCĂRCARE ZIP === */
router.get('/:idres/zip', makeSureLoggedIn.ensureLoggedIn(), (req, res, next) => {
    console.log(`Parametrii primiti sunt `, req.params);
    console.log(`Query-ul primit este `, req.query);
    // https://forbeslindesay.github.io/express-route-tester/

    // let dirPath = `${req.params.path}`, `/${req.params.uuid}`;

    // #1 Generează dinamic o pagină HTML a resursei
    Resursa.findById(req.params.idres).populate({path: 'competenteS'}).lean().then(function (resursa) {
        // console.log(`Baza cu care generezi pagina web este aici `, resursa.content);
        // #1.1. Generează o pagină web care să facă referință la toate resursele ca fiind locale dar care sunt în subdirul /data
        // adaptează editorJS2HTML.js
        let articlehtml = editorJs2HTMLstatic(resursa.content, resursa.coperta);

        let localizat = moment(resursa.date).locale('ro').format('LLL');
        resursa.dataRo = `${localizat}`; // formatarea datei pentru limba română.

        let titlurialternative = '';
        if (resursa.titleI18n) {
            let ta = resursa.titleI18n.map((elem) => {
                let keys = Object.keys(elem), alt;
                for (alt of keys) {
                    return `<p itemprop="alternativeHeadline"><strong>${alt}</strong>: <em>${elem[alt]}</em></p>`;
                }
            });
            titlurialternative = ta.join('');
        }

        let arricurriculare = '';
        if (resursa.arieCurriculara) {
            let ac = resursa.arieCurriculara.map((elem) => {
                return `<p itemprop="targetName">${elem}</p>`;
            });
            arricurriculare = ac.join('');
        }

        let clase = '';
        if (resursa.level) {
            let cl = resursa.level.map((elem) => {
                return `<p itemprop="educationalLevel">${elem}</p>`;
            });
            clase = cl.join('');
        }

        let discipline = '';
        if (resursa.discipline) {
            let discs = resursa.discipline.map((elem) => {
                return `<p itemprop="teaches">${elem}</p>`;
            });
            discipline = discs.join('');
        }

        let tags = '';
        if (resursa.etichete) {
            let tgs = resursa.etichete.map((elem) => {
                return `<span itemprop="keywords">${elem}</span>`;
            });
            tags = tgs.join(' ');
        }

        let compsG = '';
        if (resursa.competenteGen) {
            let cpgs = resursa.competenteGen.map((elem) => {
                return `<p itemprop="teaches">${elem}</p>`;
            });
            compsG = cpgs.join('');
        }
        
        let compsS = '';
        if (resursa.competenteS) {
            let cpgss = resursa.competenteGen.map((elem) => {
                return `<p itemprop="teaches">${elem}</p>`;
            });
            compsS = cpgss.join('');
        }

        let activs = '';
        if (resursa.activitati) {
            let acts = resursa.activitati.map((elem) => {
                return `<p itemprop="teaches">${elem}</p>`;
            });
            activs = acts.join('');
        }

        let resgroups = '';
        if (resursa.grupuri) {
            let grps = resursa.grupuri.map((elem) => {
                return `<li itemprop="educationalRole">${elem}</li>`;
            });
            resgroups = grps.join('');
        }
        
        let maters = '';
        if (resursa.materiale) {
            let mats = resursa.materiale.map((elem) => {
                return `<p>${elem}</p>`;
            });
            maters = mats.join('');
        }
                
        let domes = '';
        if (resursa.domeniu) {
            let mats = resursa.domeniu.map((elem) => {
                return `<p>${elem}</p>`;
            });
            domes = mats.join('');
        }

        let fcss = '';
        if (resursa.functii) {
            let fcs = resursa.functii.map((elem) => {
                return `<p>${elem}</p>`;
            });
            fcss = fcs.join('');
        }

        let dems = '';
        if (resursa.demersuri) {
            let dmss = resursa.demersuri.map((elem) => {
                return `<p>${elem}</p>`;
            });
            dems = dmss.join('');
        }

        let invss = '';
        if (resursa.invatarea) {
            let invs = resursa.invatarea.map((elem) => {
                return `<p>${elem}</p>`;
            });
            invss = invs.join('');
        }

        let toolling = '';
        if (resursa.relatedTo) {
            let tlss = resursa.relatedTo.map((elem) => {
                return `<p>${elem}</p>`;
            });
            toolling = tlss.join('');
        }

        let htmlpage = `
            <!DOCTYPE html>
            <html lang="ro-RO">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>${req.params.idres}</title>
                    <style>
                        body {
                            display: grid;
                            grid-template-columns: 25% 25% 25% 25%;
                            grid-template-rows: auto;
                            grid-template-areas:
                                "header header header header" 
                                "main main main main" 
                                "footer footer footer footer"
                        }
                        header {
                            grid-area: header;
                        }
                        main {
                            grid-area: main;
                            justify-self: stretch;
                        }
                        footer: {
                            grid-area: footer;
                        }
                    </style>
                </head>
                <body itemscope itemtype="https://schema.org/LearningResource">
                    <header>
                        <section>
                            <!-- TITLE -->
                            <h1 itemprop="name">${resursa.title}</h1>

                            <!-- DATA CONTRIBUȚIEI -->
                            <p>
                                <meta itemprop="datePublished" content="${resursa.dataRo}">
                                ${resursa.dataRo}
                            </p>

                            <!-- CREATOR -->
                            <p itemprop="creator">
                                <i class="fas fa-user-circle"></i><span contenteditable="true">${resursa.autori}</span>
                            </p>

                            <!-- TITLURILE ALTERNATIVE -->
                            <div class="titlaltres">
                                <h5>Titluri alternative</h5>
                                ${titlurialternative}
                            </div>
                        </section>
                        <section>
                            <!-- ÎNCADRARE -->
                            <div>
                                <h5><span itemprop="educationalFramework">Arie curriculară</span></h5>
                                ${arricurriculare}
                                <h5>Clasa</h5>
                                ${clase}
                                <h5>Discipline</h5>
                                ${discipline}
                                <h5>Competențe generale</h5>
                                ${compsG}
                                <h5>Competențe specifice</h5>
                                ${compsS}
                                <h5>Activități</h5>
                                ${activs}
                            </div>
                        </section>
                        <section>
                            <h5>Descriere</h5>
                            <p itemprop="description" class="lead">${resursa.description}</p>
                            <h5>Cuvinte cheie</h5>
                            ${tags}
                        <section>
                    </header>
                    <main>
                        <aside>
                            <h5>RED-ul necesită competențe digitale de nivelul</h5>
                            ${resursa.abilitati}
                            <h5> RED-ul se adresează în mod direct</h5>
                            <ul itemprop="audience" itemscope itemtype="http://schema.org/EducationalAudience">
                                ${resgroups}
                            </ul>
                            <h5>Activități de învățare susținute</h5>
                            <p>${resursa.rol}</p>
                            <h5>Materiale necesare redării/interpretării</h5>
                            ${maters}
                            <h5>Domeniul căruia i se adresează resursa</h5>
                            ${domes}
                            <h5>Resursa vizează:</h5>
                            ${fcss}
                            <h5>Tipul de demers / raționament utilizat în realizarea resursei</h5>
                            ${dems}
                            <h5>Modul în care se produce învățarea se face prin</h5>
                            ${invss}
                            <h5>Mijloace / materiale didactice necesare</h5>
                            <p>${resursa.dependinte}</p>
                            <h5>Instrumente folosite în elaborarea RED-ului</h5>
                            ${toolling}
                        </aside>
                        ${articlehtml}
                    </main>
                    <!-- [BIBLIOGRAFIE] -->
                    <section>
                        <div class="bibsrespub">
                            <h5>Bibliografie</h5>
                            <p>${resursa.bibliografie}</p>
                        </div>
                    </section>
                    <footer>
                        <h5>Licența</h5>
                        <p itemprop="license">${resursa.licenta}</p>
                    </footer>
                </body>
            </html>
        `;
        
        const data = new Uint8Array(Buffer.from(htmlpage));
        fs.writeFile(`./repo/${req.query.path}/data/index.html`, data, async (error) => {
            if (error) {
                console.log(error);
            }

            let originpath = path.join(`./repo/`, `${req.query.path}/data/`);
            let output  = fs.createWriteStream(originpath + `${req.query.uuid.slice(0, 4)}-${resursa.title.slice(0, 9)}-${localizat}.zip`),
                archive = archiver('zip', { zlib: { level: 9 } });
        
            // generează arhiva din subdirectorul resursei în subdirectorul țintă din deleted
            // archive.directory(dirPath, path2deres);

            // WARNINGS
            archive.on('warning', function archiveMakingWarning (warning) {
                console.warn("[sockets.js::'delresid'] Atenție, la arhivare a dat warning", warning);
            });
            // ERRORS
            archive.on('error', function manageErrorOnArchiving (err) {
                console.error("[sockets.js::'delresid'] La crearea arhivei a apărut eroarea!", err);
                logger.error(`[sockets.js::'delresid'] În timpul arhivării după ștergere a apărut eroarea ${err.message}`);
            });

            let daziploc = `./repo/${req.query.path}/data/` + `${req.query.uuid.slice(0, 4)}-${resursa.title.slice(0, 9)}-${localizat}.zip`;
            let dazipname= `${req.query.uuid.slice(0, 4)}-${resursa.title.slice(0, 9)}-${localizat}.zip`;

            archive.on('close', () => {
                console.log(`am terminat arhivarea`);
            })

            // https://github.com/archiverjs/node-archiver/issues/402 [archiver.directory doesn't follow symbolic link #402]
            
            let paths = await walk(originpath);

            // let gpaths = await globby([`${originpath}**`, '!node_modules']);
            // console.log(paths);

            paths.forEach((entry) => {
                archive.file(entry, {name: path.basename(entry)});
            }); 

            // constituie arhiva!                   
            // archive.pipe(output);
            archive.pipe(res);

            res.set('Content-Type','application/octet-stream');
            res.set('Content-Disposition',`attachment; filename=${dazipname}`);
            // res.set('Content-Length',data.length);
            // res.attachment(daziploc);

            output.on('end', function() {
                console.log('Data has been drained');
            });

            /* === FINALIZEAZĂ ARHIVAREA === */
            archive.finalize();
        });




        //_ WORKING: 1.2. Scrie pagina pe hard
        // 1.3. Verifică dacă pagina există pe hard în /data
        // 1.4. Creează arhiva
        // 1.5. Trimite clientului arhiva
        // 1.6. Șterge pagina web din /data
    }).catch((err) => {
        if (err) {
            console.error(err);
            logger.error(err);
            // rre('mesaje', `Nu pot să afișez resursa. Este posibil să nu mai existe! Eroare: ${err}`);
            res.redirect('/administrator/reds');
        }
    });

    /* #2 === ARHIVEAZĂ === */
    // let output  = fs.createWriteStream(path2deres + `${resource.uuid}.zip`),
    //     archive = archiver('zip', { zlib: { level: 9 } });

    // // generează arhiva din subdirectorul resursei în subdirectorul țintă din deleted
    // archive.directory(dirPath, path2deres);
    // // constituie arhiva!                   
    // archive.pipe(output);
    // // WARNINGS
    // archive.on('warning', function archiveMakingWarning (warning) {
    //     console.warn("[sockets.js::'delresid'] Atenție, la arhivare a dat warning", warning);
    // });
    // // ERRORS
    // archive.on('error', function manageErrorOnArchiving (err) {
    //     console.error("[sockets.js::'delresid'] La crearea arhivei a apărut eroarea!", err);
    //     logger.error(`[sockets.js::'delresid'] În timpul arhivării după ștergere a apărut eroarea ${err.message}`);
    //     // throw err;
    // });

    // /* === Când se încheie procesul de arhivare === */
    // output.on('close', clbkDelfromMgEs7);

    // /* === FINALIZEAZĂ ARHIVAREA === */
    // archive.finalize();




});

module.exports = router;
