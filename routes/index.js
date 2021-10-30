require('dotenv').config();
const express  = require('express');
const router   = express.Router();
const moment   = require('moment');
const Resursa  = require('../models/resursa-red');              // Adu modelul resursei
const Mgmtgeneral = require('../models/MANAGEMENT/general');    // Adu modelul management
const logger   = require('../util/logger');

// LOGO
let LOGO_IMG = "img/" + process.env.LOGO;

/* === LANDING :: / === */
async function clbkRootRoute (req, res, next) {
    
    // Setări în funcție de template
    let filterMgmt = {focus: 'general'};
    let gensettings = await Mgmtgeneral.findOne(filterMgmt);
    // Resursa.where({'generalPublic': true}).countDocuments(function cbCountResPub (err, count) {
    //     if (err) throw err;
    //     console.log('Numărul resurselor este: ', count);
    // });

    /* Adu ultimele 8 RESURSE pe landing */
    let resursePublice = Resursa.find({'generalPublic': true}).sort({"date": -1}).limit(8);
    resursePublice.exec().then((result) => {
        let newResultArr = [];

        result.map(function clbkMapResult (obi) {
            const newObi = Object.assign({}, obi._doc); // Necesar pentru că: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
            // https://github.com/wycats/handlebars.js/blob/master/release-notes.md#v460---january-8th-2020
            newObi.dataRo = moment(newObi.date).locale('ro').format('LLL');
            newResultArr.push(Object.assign(newObi));
        });
        
        let scripts = [
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
            {script: `${gensettings.template}/js/custom.js`},
            {script: `${gensettings.template}/js/IndexInfotoken.js`}
        ];

        let modules = [
            {module: `${gensettings.template}/lib/npm/popper.min.js`},
            {module: `${gensettings.template}/js/main.mjs`}
        ];

        let styles = [
            {style: `${gensettings.template}/lib/npm/all.min.css`}
        ];

        let user = req.user;
        let csrfToken = req.csrfToken();
        
        res.render(`index_${gensettings.template}`, {
            template:  `${gensettings.template}`,
            title:     "Acasă",
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
}
router.get('/', (req, res, next) => {
    clbkRootRoute(req, res, next).catch((error) => {
        console.log(err);
        logger.error(err);
        next(err);
    })
});

module.exports = router;