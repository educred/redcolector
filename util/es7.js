require('dotenv').config();
// const esClient     = require('../elasticsearch.config');
const logger = require('./logger');
const { promisify } = require("util");
const redisClient  = require('../redis.config');
// promisifcare metodă `hgetall`
const hgetallAsync = promisify(redisClient.hgetall).bind(redisClient);

/* INDECȘII ES7 */
// Setezi valori de inițializare. Atenție, aici se face hardcodarea denumirilor indecșilor. Fiecare index este varianta la plural a numelui schemei la export
var ESIDXS = {
    RES_IDX_ES7: 'resursedus0', 
    RES_IDX_ALS: 'resursedu', 
    USR_IDX_ES7: 'users0', 
    USR_IDX_ALS: 'users'
};

/*
De fiecare dată când se realizează o conexiune, vezi `elasticsearch.config.js`, sunt setate valorile numelor în Redis.
În cazul în care ne aflăm chiar la instalarea aplicației, aceste valori n-au de unde să fie setate. Inițial sunt luate de aici
*/
exports.getStructure = async function getStructure () {
    try {
        let val = await hgetallAsync(process.env.APP_NAME + ":es");
        let k = Object.keys(val), i;
        for (i = 0; i < k.length; i++) {
            ESIDXS[k[i]] = val[k[i]];
        };
        return ESIDXS;
    }catch(errror){
        console.log(error);
        logger.error(errror);
    }
};