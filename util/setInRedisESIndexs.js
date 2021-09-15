require('dotenv').config();
const logger      = require('./logger');
const redisClient = require('../redis.config');

module.exports = function setInRedisESIndexes (client) {
    /**
     *Funcția are rol de callback pentru then-ul din care se încarcă în REDIS numele indecșilor și ale alias-urilor
    *Funcția investighează ce indecși există deja, dacă aceștia au o formă *canonică*, iar dacă nu (motive istorice)
    *corectează prin constituirea unui index nou după forma canonică (`numeindex0`), pentru care creează și alias, după care reindexează
    * @param {Object} r
    */
    function clbkIndices (r) {
        // console.log("[elasticsearch.config.js::clbkIndices()] Datele despre indici sunt ", r.body.indices);

        // CAZUL ÎN CARE AI INDICII DEJA CREAȚI!!!
        if (r.body.indices) {

            // pentru fiecare obiect ce reprezintă câte un index (`d`)
            for (d in r.body.indices) {
                let alsr = '';  // alias-ul

                // Dacă am un nume de index care este format din nume plus versiune, precum în `resedus1` [CANONIC VERSION!]
                if ((/(\d{1,})+/g).test(d)) {
                    // taie fragmentul de nume până la cifra care indica versiunea
                    // console.log("[elasticsearch.config.js::clbkIndices()] Pot taia", d.slice(0, d.search(/(\d{1,})+/g)));
                    alsr = d.slice(0, d.search(/(\d{1,})+/g)); // extrage numele alias-ului pentru index
                } else {
                    // dacă nu am un index de forma `resedus1`, atunci avem o mare problemă pentru că este un alias
                    alsr = d; // am pus această opțiune din motive istorice, când nu era plănuită vreo reindexare folosind alias-uri
                    //- WORKING: Aici ar trebui reparat in sensul ștergerii indexului, a constituiri unuia nou cu zero în coadă și a alias-ului său
                    //         urmat de o reindexare a tuturor datelor colecției din Mongo pe noul index.
                    // Funcția ES7Helper.delAndCreateNew() face acest lucru la accesarea statisticilor privind Elasticsearch în administrator
                }

                // setează valorile în Redis
                switch (alsr) {
                    case "users":
                        redisClient.hset( process.env.APP_NAME + ":es", "USR_IDX_ES7", d); // se creează o cheie redcolector:red:USR_IDX_ES7
                        redisClient.hset( process.env.APP_NAME + ":es", "USR_IDX_ALS", alsr);
                        break;
                    case "resursedus":
                        redisClient.hset( process.env.APP_NAME + ":es", "RES_IDX_ES7", d);
                        redisClient.hset( process.env.APP_NAME + ":es", "RES_IDX_ALS", alsr);
                        break;
                }
            }
        }
    };

    /* Setează în Redis numele indecșilor */
    client.indices.stats({
        index: "*,-.*",
        level: "indices"
    }).then(clbkIndices).catch((err) => {
        console.error('[elasticsearch.config::client.indices.stats] La actualizarea indecșilor în Redis, a apărut eroarea ', err.message);
        logger.error(err);
    });
}