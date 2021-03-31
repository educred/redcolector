require('dotenv').config();
const logger      = require('./util/logger');
const redisClient = require('./redis.config');
const { Client }  = require('@elastic/elasticsearch');

const client = new Client({
    node: process.env.ELASTIC_URL,
    maxRetries: 5,
    requestTimeout: 2000    ,
    sniffInterval: 500,
    sniffOnStart: true,
    sniffOnConnectionFault: true,
    log: 'trace'
});

client.info((err, info) => {
    if (err) {
        console.log(err);
    } else if (info.statusCode === 200) {
        // console.log("Conectare reușită la Elasticsearch pe clusterul cu numele: ", info.body.cluster_name);
        client.info().then((r) => {
            console.log("Conectare reușită la Elasticsearch ", r.body.version.number, " Stare: ", r.meta.connection.status, "Clusterul: ", info.body.cluster_name);
        }).catch(e => console.error);
    }
});

/* Setează în Redis numele indecșilor;
 accesează și actualizează ori de câte ori se 
 reindexează prin incrementarea valorii de după nume */
client.indices.stats({
    index: "*,-.*",
    level: "indices"
}).then((r) => {
    // console.log("Datele despre indici sunt ", r.body.indices);
    if (r.body.indices) {
        // pentru fiecare obiect indice (`d`)
        for (d in r.body.indices) {
            // let vs = d[0].slice(d[0].search(/\d{1,}/g));
            let alsr = '';

            // dar dacă am un nume de index care este format din nume plus versiune, precum în `resedus1`
            if ((/(\d{1,})+/g).test(d)) {
                // taie fragmentul de nume până la cifra care indica versiunea
                // console.log("Pot taia", d.slice(0, d.search(/(\d{1,})+/g)));
                alsr = d.slice(0, d.search(/(\d{1,})+/g));
            }
            // dacă nu am un index de forma `resedus1`, atunci avem o mare problemă pentru că este un alias
            alsr = d; // am pus această opțiune din motive istorice când nu era plănuită vreo reindexare folosind alias-uri

            // setează valorile în Redis
            switch (alsr) {
                case "users":
                    redisClient.set("USR_IDX_ES7", d);
                    redisClient.set("USR_IDX_ALS", alsr);
                    break;
                case "resedus":
                    redisClient.set("RES_IDX_ES7", d);
                    redisClient.set("RES_IDX_ALS", alsr);
                    break;
            }
        }
    }
}).catch((err) => {
    console.error('[elasticsearch.config::ELASTICSEARCH] La actualizarea indecșilor în Redis, a apărut eroarea ', err.message);
    logger.error(`Setarea valorilor în Redis pentru indecși a eșuat cu următorul mesaj: ${err.message}`);
});

// redisClient.get("RES_IDX_ES7", (err, reply) => {
//     if (err) console.error;
//     console.log(reply);
// })

// client.cluster.health().then(r => console.log(r)).catch(e => console.error);
// client.info().then(r => console.log(r)).catch(e => console.error);
module.exports = client;