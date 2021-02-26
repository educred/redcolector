require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');
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

client.on('sniff', (err, req) => {
    // console.log('ES7 sniff: ', err ? err.message : '', `${JSON.stringify(req.meta.sniff)}`);
    console.log('ES7 sniff: ', err ? err.message : 'Nicio problemă detectată la inițializare!!! All norminal 👌');
});

// client.cluster.health().then(r => console.log(r)).catch(e => console.error);
// client.info().then(r => console.log(r)).catch(e => console.error);
module.exports = client;