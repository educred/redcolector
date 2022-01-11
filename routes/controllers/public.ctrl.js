const moment = require('moment');
const got    = require('got');
const logger = require('../../util/logger');
const mongoose = require('mongoose');

// LOGO
let LOGO_IMG = "img/" + process.env.LOGO;

/**
 * Funcția are rolul de a randa resursele care sunt publice.
 * - Numărul resurselor afișat este hardcodat la 8
 * - fii foarte atent la ordinea elementelor din `resurse`: `[scripts, modules, styles]`
 * 
 * @param {Object} req Obiectul `request`
 * @param {Object} res Obiectul `response`
 * @param {Function} next Funcția `next()`
 * @param {Object} gensettings obiectul rezultat al promisiunii - setările generale ale aplicației
 * @param {Object} Model Modelul mongoose care va fi folosit
 * @param {Object} modelOpts este proiecția necesară lui `find`
 * @param {Array} resurse Array de array-uri cu toate resursele necesare randării (`script`, `module`, `style`) 
 * @param {String} tabtitle Numele care apare în tab
 */
async function renderPublic (req, res, next, gensettings, Model, modelOpts, resurse, tabtitle) {
    
    let [scripts, modules, styles] = resurse;  // fii foarte atent la ordinea din array

    // creează obiectul `Query`
    let findQuery = Model.find(modelOpts.projection).lean();

    // Parametrizează obiectul Query. A înlocuit Model.find(modelOpts.projection).sort({"date": -1}).limit(8)
    for (let [opt, val] of Object.entries(modelOpts.queryOpts)) {
        findQuery[opt](val);
    }

    // console.log(findQuery instanceof mongoose.Query);
    // console.log(findQuery.getFilter());

    function renderRED (resurse) {
        let newResultArr = [],
            user = req.user,
            csrfToken = req.csrfToken();

        newResultArr = resurse.map((obi) => {
            // [ÎNREGISTRAREA ÎN ÎNTREGIME]
            // adaug o nouă proprietate la rezultat cu o proprietate a sa serializată [injectare în client a întregii înregistrări serializate]
            obi.editorContent = JSON.stringify(resurse);
            
            // [DATA CALENDARISTICĂ]
            obi.dataRo = moment(obi.date).locale('ro').format('LLL');   // formatarea datei pentru limba română. 

            // [ACTIVITĂȚI]
            obi.activitati = obi.activitati.map((elem) => {
                let sablon = /^([aA-zZ])+\d/g;
                let cssClass = elem[0].match(sablon);
                let composed = '<span class="' + cssClass[0] + 'data-code="' + elem[0] + '">' + elem[1] + '</span>';
                return composed;
            });

            // [COPERTA]
            if (obi.coperta === undefined) {
                // let {body} = await got(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_KEY}&collections=education`);
                // obi.coperta = bodyobi.urls.regular;
                obi.coperta = `/${gensettings.template}/img/black-1072366_1920.jpg`;
                // console.log(obi);
                // newResultArr.push(Object.assign(obi))1;
            }
            return obi;
        });

        res.render(`index_${gensettings.template}`, {
            template:  `${gensettings.template}`,
            activeResLnk: true,
            title:     `${tabtitle}`,
            user,
            logoimg:   `${gensettings.template}/${LOGO_IMG}`,            
            resurse:   newResultArr,
            csrfToken,
            modules,
            scripts,
            styles,
            creator: gensettings.creator,
            publisher: gensettings.publisher,
            brandname: gensettings.brand,
            description: gensettings.description,
            publisher: gensettings.publisher,
            author: gensettings.contact
        });
    };

    findQuery.exec().then(renderRED).catch((err) => {
        if (err) {
            console.log(err);
            logger.error(err);
            next(err);
        }
    });
};

module.exports = renderPublic;