const moment = require('moment');
const got    = require('got');
const logger = require('../../util/logger');

// LOGO
let LOGO_IMG = "img/" + process.env.LOGO;

module.exports = function renderPublicREDs (req, res, next, gensettings, Model, resurse, tabtitle) {

    let [scripts, modules, styles] = resurse;

    /* Adu ultimele 8 RESURSE pe landing */
    Model.find({'generalPublic': true}).sort({"date": -1}).limit(8).exec().then((result) => {
        let newResultArr = [];
        let user = req.user;
        let csrfToken = req.csrfToken();

        async function clbkMapResult (obi) {
            const newObi = Object.assign({}, obi._doc); // Necesar pentru că: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
            // https://github.com/wycats/handlebars.js/blob/master/release-notes.md#v460---january-8th-2020
            newObi.dataRo = moment(newObi.date).locale('ro').format('LLL');
            
            if (newObi.coperta === undefined) {
                // let {body} = await got(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_KEY}&collections=education`);
                // newObi.coperta = bodyobi.urls.regular;
                newObi.coperta = `/${gensettings.template}/img/black-1072366_1920.jpg`;
                // console.log(newObi);
                // newResultArr.push(Object.assign(newObi));
            }

            newResultArr.push(Object.assign(newObi));
        };
        result.map((obi) => {
            clbkMapResult(obi).catch((error) => {
                console.log(`Eroarea apărută este `, error);
                logger.error(error);
            });
        });
        
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