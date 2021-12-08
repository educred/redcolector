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
    
    let [scripts, modules, styles] = resurse;  // fii foarte atent la ordine.

    // creează obiectul `Query`
    let findQuery = Model.find(modelOpts.projection);

    // Parametrizează obiectul Query. A înlocuit Model.find(modelOpts.projection).sort({"date": -1}).limit(8)
    for (let [opt, val] of Object.entries(modelOpts.queryOpts)) {
        findQuery[opt](val);
    }

    // console.log(findQuery instanceof mongoose.Query);
    // console.log(findQuery.getFilter());

    // execută pentru a crea `Promise`
    findQuery.exec().then((result) => {
        let newResultArr = [],
            user = req.user,
            csrfToken = req.csrfToken();

        function clbkMapResult (obi) {
            const newObi = Object.assign({}, obi._doc); // Necesar pentru că: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
            // https://github.com/wycats/handlebars.js/blob/master/release-notes.md#v460---january-8th-2020
            newObi.dataRo = moment(newObi.date).locale('ro').format('LLL');
            
            if (newObi.coperta === undefined) {
                // let {body} = await got(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_KEY}&collections=education`);
                // newObi.coperta = bodyobi.urls.regular;
                newObi.coperta = `/${gensettings.template}/img/black-1072366_1920.jpg`;
                // console.log(newObi);
                // newResultArr.push(Object.assign(newObi))1;
            }

            return Object.assign(newObi);
        };
        
        newResultArr = result.map((obi) => {return clbkMapResult(obi)});

        // console.log(newResultArr);
        
        return res.render(`index_${gensettings.template}`, {
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
    }).catch((err) => {
        if (err) {
            console.log(err);
            logger.error(err);
        }
    });
};

module.exports = renderPublic;