require('dotenv').config();
// const esClient     = require('../elasticsearch.config');
const redisClient  = require('../redis.config');

/* INDECȘII ES7 */
// Setezi valori de inițializare. Atenție, aici se face hardcodarea denumirilor indecșilor. Fiecare index este varianta la plural a numelui schemei la export
const ESIDXS = {
    RES_IDX_ES7: 'resursedus0', 
    RES_IDX_ALS: 'resursedu', 
    USR_IDX_ES7: 'users0', 
    USR_IDX_ALS: 'users'
};
let kidx = Object.keys(ESIDXS), i;

function getNameIdxAls (elem) {
    redisClient.get(process.env.APP_NAME + ":red:" + elem, function clbkRedisGet (err, val) {
        if (err) console.error;
        console.log('Elementul este ', elem, ' iar valoarea este ', val);
        ESIDXS[elem] = val;
    });
}

for (i = 0; i < kidx.length; i++) {
    getNameIdxAls(kidx[i]); // este elementul
}


// redisClient.get(process.env.APP_NAME + ":RES_IDX_ES7", (err, reply) => {
//     if (err) console.error;
//     RES_IDX_ES7 = reply;
// });
// redisClient.get(process.env.APP_NAME + ":RES_IDX_ALS", (err, reply) => {
//     if (err) console.error;
//     RES_IDX_ALS = reply;
// });
// redisClient.get(process.env.APP_NAME + ":USR_IDX_ES7", (err, reply) => {
//     if (err) console.error;
//     USR_IDX_ES7 = reply;
// });
// redisClient.get(process.env.APP_NAME + ":USR_IDX_ALS", (err, reply) => {
//     if (err) console.error;
//     USR_IDX_ALS = reply;
// });

// returnează un obiect a cărui nume de chei sunt numele indecșilor și ale alias-urilor existente în Elasticsearch
exports.getStructure = function getStructure () {
    return ESIDXS;
}