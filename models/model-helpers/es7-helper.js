require('dotenv').config();
const esClient     = require('../../elasticsearch.config');
const Resursa      = require('../resursa-red');
const User         = require('../user');
const logger       = require('../../util/logger');

    // io.on('connect', socket => {
    //     console.log("Id-ul conectat este: ", socket.id);
    //     console.log(socket.handshake);
    //     // console.log(socket.handshake.query._csrf);
    //     socket.on('testconn', function cbMesaje (mesaj) {
    //         const detaliiConn = pubComm.server.eio.clients[socket.id]; // obține detaliile de conexiune individuale
    //         console.log('Serverul a primit următorul mesaj: ', mesaj, detaliiConn.upgraded);
    //     });
    // });

// const mongoose     = require('../../mongoose.config');
// const CompetentaS  = require('../competenta-specifica');
// const ES7schemaRED = require('../resursa-red-es7');
const editorJs2TXT = require('../../routes/controllers/editorJs2TXT'); 

// mapping-urile indecșilor
const resursaRedES7 = require('../resursa-red-es7'); // '-es7' indică faptul că sunt setările și mappingul noului index
const userES7 = require('../user-es7');
// utilități pentru Elasticsearch
let {getStructure}  = require('../../util/es7'); // `getStructure()` este o promisiune a cărui rezultat sunt setările indecșilor și ale alias-urilor (vezi `elasticsearch.config.js`, unde sunt setați)

var procesate = 0;
// stabilirea denumirii indexului zero pentru resurse și a alias-ului.
let primeREDidx   = process.env.MONGO_REDS + '0';
let primeREDidxAl = process.env.MONGO_REDS;

/**
 * Funcția are rolul de a verifica dacă indexul și aliasul indexului există.
 * Dacă indexul nu există și în consecință alias-ul, vor fi create și va fi indexat primul document.
 * În cazul în care indexul există, va fi indexat documentul dacă acesta nu există deja în index.
 * ATENȚIE!! Este rolul apelantului să paseze valori pentru `idx`, cât și pentru `aliasidx`.
 * @param {Object} schema Este schema ES7 în baza căreia creezi index nou
 * @param {Object} data Este un obiect care mapează documentul Mongoose și constituie un POJO nou remodelat, dacă e nevoie
 * @param {String} idx Este un string din Redis cu numele indexului ES pentru care s-a constituit alias-ul
 * @param {String} aliasidx Este un string din .env cu numele indexului alias la care trebuie indexată înregistrarea
 */
exports.searchIdxAndCreateDoc = async function searchIdxAndCreateDoc (schema, data, idx, aliasidx) {
    // https://stackoverflow.com/questions/44395313/node-mongoose-how-to-get-a-full-list-of-schemas-documents-and-subdocuments
    // console.log('[es7-helper.js::searchIdxAlCreateDoc()] `schema.paths` are valorile: ', schema);
    /*
    {
        settings: {
            index: { number_of_shards: 3, number_of_replicas: 2 },
            analysis: { analyzer: [Object], filter: [Object] }
        },
        mappings: {
            properties: {
                date: [Object],
                idContributor: [Object],
                emailContrib: [Object],
                uuid: [Object],
                autori: [Object],
                langRED: [Object],
                title: [Object],
                titleI18n: [Object],
                arieCurriculara: [Object],
                level: [Object],
                discipline: [Object],
                disciplinePropuse: [Object],
                competenteGen: [Object],
                description: [Object],
                identifier: [Object],
                dependinte: [Object],
                content: [Object],
                bibliografie: [Object],
                contorAcces: [Object],
                generalPublic: [Object],
                contorDescarcare: [Object],
                etichete: [Object],
                utilMie: [Object],
                expertCheck: [Object]
            }
        },
        aliases: { resedus: {} }
    }
    */

    try {
        // #1 Testează dacă există index și alias-ul său. https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/exists_examples.html
        let idxE = await esClient.indices.exists(
            {index: aliasidx}, 
            {errorTrace: true}
        );
        let idxAlE = await esClient.indices.existsAlias({name: aliasidx, index: idx});

        // dacă indexul există și are alias creat, verifică existența documentului
        if (idxE.statusCode === 200 && idxAlE.statusCode === 200) {
            console.log('[es7-helper.js::searchIdxAlCreateDoc] Indexul pasat există și are și alias.');

            // INDEXEAZĂ DOCUMENT!!!
            await esClient.create({
                id:      data.id,
                index:   aliasidx,
                refresh: true,
                body:    data
            });
        } else if (idxE.statusCode === 404) {
            // console.log("[es7-helper.js::searchIdxAlCreateDoc] Indexul și alias-ul nu există. Le creez acum!");
            // creează indexul și aliasul. NOTE: Este de datoria apelantului să ofere valori pentru idx și aliasidx. La apelare trebuie verificate.
            await esClient.indices.create({
                index: idx,
                body:  schema
            },{errorTrace: true});

            // creează alias la index
            await esClient.indices.putAlias({
                index: idx,
                name:  aliasidx
            },{errorTrace: true});
            
            // INDEXEAZĂ DOCUMENT!!!
            await esClient.create({
                id:      data.id,
                index:   aliasidx,
                refresh: true,
                body:    data
            });
            //- TODO: Actualizează numele indecșilor in Redis            
        }        
    } catch (error) {
        console.error(JSON.stringify(error.body, null, 2));
        logger.error(error);
    };
};

exports.recExists = async function recExists (id, idx) {
    try {
        const {body} = await esClient.exists({
            index: idx,
            id: id
        });
        return body;
    } catch (error) {
        console.error(JSON.stringify(error.body, null, 2));
        logger.error(error);
    }
};

/**
 * Funcția are rolul de a șterge indexul precizat prin string ca argument.
 * @param {Object} data Numele indexului și a alias-ului care trebuie șterse `{idx: "nume", alsr: "numeals"}`
 * @returns 
 */
exports.deleteIndex = function deleteIndex (data) {
    // console.log('[es7-helper.js::deleteIndex] Datele primite sunt: ', data);
    // dacă există și alias pentru index, șterge alias-ul și indexul
    if (data.alsr) {
        delAlias(data).then((r) => {
            // console.log(`[es7-helper::delAlias] Rezultatul ștergerii alias-ului dupa returnare`, r);
            if (r === 200 || r === 404) {
                delIdx(data.idx); // șterge indexul
            }
        }).catch((error) => {
            if (error) {
                logger.error(error);
            }
        });
    };
};

/**
 * Funcția are rol de helper pentru `deleteIndex()`
 * Sterge un index
 * @param {Object} data Numele indexului și a alias-ului care trebuie șterse `{idx: "nume", alsr: "numeals"}`
 * @returns 
 */
function delIdx (idx) {
    esClient.indices.delete({
        index: idx
    }).then((body) => {
        if (body.error) {            
            // console.log('\x1b[33m' + 'Nu am reușit să șterg indexul' + '\x1b[37m');
            // console.log(JSON.stringify(body, null, 4));
            logger.error(body.error);
        }
    }).catch((err) => {
        logger.error(err);
    });
}

/**
 * Funcția are rol de helper pentru `deleteIndex()`
 * Sterge un alias
 * @param {Object} data Numele indexului și a alias-ului care trebuie șterse `{idx: "nume", alsr: "numeals"}`
 * @returns 
 */
function delAlias (data) {
    return esClient.indices.deleteAlias({
        index: data.idx,
        name: data.alsr
    }).then((body) => {
        // console.log(`[es7-helper::delAlias] Rezultatul ștergerii alias-ului`, body);
        return body.statusCode;
    }).catch((err) => {
        if (err.meta.statusCode === 404) {
            // console.error(`[es7-helper::delAlias] Alias-ul nu exista. Stare: `, err.meta.statusCode);
            return err.meta.statusCode;
        }
        logger.error(err);
    });
}

/**
 *Funcția are rolul de a șterge un index primit ca valoare și aliasul său urmat de crearea unui index și a alias-ului său
 *Opțional, poți schimba denumirea indexului nou
 * @param {Object} schema Este schema ES7 în baza căreia creezi index nou
 * @param {String} oldIdx Numele indexului vechi
 * @param {Number|''} vs  Versiunea indexului vechi (acoperă cazul denumirilor necanonice în care numele indexului este cel al alias-ului)
 * @param {String} newIdx Numele noului index, în cazul în care dorești și o schimbare de nume 
 * @returns {Boolean} true dacă s-a făcut index nou și s-au reindexat datele pe acesta
 */
exports.delAndCreateNew = async function delAndReindex (schema, oldIdx, vs = '', newIdx) {
    // în cazul în care nu ai valoare pentru `vs`, asigură-te că este un empty string
    let idx = oldIdx + vs,
        nvs,
        alsr,
        ndx;

    // VERIFICĂ DACĂ `oldIdx` are numarul de versiune atașat [CANONIC VERSION!] și creează numărul nou de versiune
    if ((/(\d{1,})+/g).test(oldIdx)) {
        // taie fragmentul de nume până la cifra care indica versiunea
        // console.log("[es7helper.js::delAndReindex()] Pot taia", d.slice(0, d.search(/(\d{1,})+/g)));
        alsr = oldIdx.slice(0, oldIdx.search(/(\d{1,})+/g));        // extrage numele alias-ului pentru index
        let nr = Number(oldIdx.slice(oldIdx.search(/(\d{1,})+/g))); // extrage versiunea și transformă în număr
        if (nr !== NaN) {
            nvs = ++nr;  // dacă ai obținut numărul de versiune, incrementează-l
        } else {
            nvs = 0;    // dacă ceea ce ai obținut este un `NaN`, te afli în cazul în care nu ai nr de versiune la index [NECANONIC]
        }
    }

    try {
        // verifică dacă `idx` există deja
        let idxE = await esClient.indices.exists(
            {index: idx}, 
            {errorTrace: true}
        );
        let idxAlE = await esClient.indices.existsAlias({name: alsr, index: idx});
        // dacă `idx` există, șterge-l!!
        if (idxE.statusCode === 200) {
            // în cazul în care se dorește modificare denumirii noului index, folosim parametrul special
            if (newIdx) {
                ndx = `${newIdx}${nvs}`;
                alsr = `${newIdx}`;
            }
            ndx = `${alsr}${nvs}`;   // constituie numele indexului nou din numele celui vechi

            /* === REINDEXARE ==== */
            // #1 creează noul index
            await esClient.indices.create({
                index: ndx,
                body:  schema
            },{errorTrace: true});

            // #2 creează alias nou-nouț la index, dacă nu există deja unul
            // fii foaste atent pentru că de ai ales modificarea numelui, nu mai ai alias la care să faci legătura indexului nou creat.
            await esClient.indices.putAlias({
                index: ndx,
                name:  alsr
            },{errorTrace: true});

            // #3 reindexare (mută datele din indexul vechi) -->https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/reindex_examples.html
            await esClient.reindex({
                waitForCompletion: true,
                refresh: true,
                source: {
                    index: oldIdx
                },
                destination: {
                    index: ndx
                }
            });

            // #4 verifică dacă noul index există ți șterge-l pe cel vechi
            // verifică dacă indexul nou există
            let idxN = await esClient.indices.exists(
                {index: ndx}, 
                {errorTrace: true}
            );
            if (idxN.statusCode === 200) {
                deleteIndex(oldIdx);
                return true;
            }
        }
        //- TODO: Reindexarea datelor în nou index
    } catch (error) {
        // console.error(JSON.stringify(error.body, null, 2));
        logger.error(error);
        next(error);
    }
}

let pscript =  '';
/**
 * Funcția are rolul de a face o reindexare cu date existente în indexul vechi.
 * Numărul versiunii va fi incrementat ori de câte ori este apelată.
 * @param {Object} data Numele aliasului și numărul versiunii la care este indexul
 * @param {Object} socket Este obiectul socket necasar comunicării
 */
exports.reidxincr = function reidxincr (data, socket) {
    // Reindexarea se va face ori de câte ori este modificat mapping-ul (vezi variabila `resursaRedES7`). 
    // În funcție de modificarea mapping-ului trebuie adaptat scriptul painless care să opereze modificările de structură (vezi variabila `pscript`).
    
    let idx = data.alsr + data.vs,  // Formula este `alsr` + `vs` = numele indexului.
        nvs = '';                   // noua versiune

    // promisiune de verificare alias pentru cazul în care nu ar fi alias deja
    esClient.indices.existsAlias({name: data.alsr})
        .then((r) => {
            if (r.statusCode == 200) {
                // dacă aliasul există, procedează la reindexare
                // dacă este un alias care se termină cu un număr, atunci înseamnă că e un install vechi. Șterge indexul, sterge alias-ul. Reindexează de la 0.
                // https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-aliases.html#indices-aliases-api-rename-alias-ex
                /*
                    #1 Adaugă un index nou 
                    #2 reindexează înregistrările pe noul index 
                        - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_reindex
                        - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/reindex_examples.html
                    #3 Leagă indexul nou de alias-ul existent
                    #4 Șterge indexul vechi
                */
                
                // verifică cărui index aparține alias-ul.
                esClient.cat.aliases({
                    name: data.alsr,
                    format: "json"     
                }, (err, r) => {
                    if (err) {
                        console.log("De la aliases", err);
                        logger.error(err);
                    };

                    // în cazul în care indexul primit este egal cu cel verificat pentru alias creează noul index
                    if (idx === r.body[0].index) {
                        
                        // incrementează versiunea
                        let nrvs = parseInt(data.vs);
                        let newvs = ++nrvs;
                        nvs = data.alsr + newvs; // `nvd` e prescurtare de la `new version`

                        // CREEAZĂ INDEXUL nou pasând la index, numele noului index, iar la body, mapping-ul modificat (variabila `resursaRedES7`) al indexului
                        // _FIXME: Vezi că ai `body` setat fix doar pe mapping-ul resurselor. Fă mecanism pentru detectarea mapping-ului corect pentru datele primite.
                        esClient.indices.create({
                            index: nvs,
                            body: resursaRedES7
                        }).then(async (r) => {

                            // REINDEXEAZĂ
                            let body4reindex = {
                                source: {
                                    index: idx
                                },
                                dest: {
                                    index: nvs
                                }
                                // ,
                                // script: {
                                //     lang: 'painless',
                                //     source: pscript
                                // }
                            };
                            await esClient.reindex({
                                waitForCompletion: true,
                                refresh: true,
                                body: body4reindex
                            });

                            // ATAȘEZ alias-ul noului index creat
                            // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_indices_putalias
                            await esClient.indices.putAlias({
                                index: nvs,
                                name: data.alsr
                            });
                            
                            // ȘTERGE indexul vechi
                            esClient.indices.delete({
                                index: idx
                            }, (error, r) => {
                                if (error) {
                                    logger.error(error);
                                    console.log("Când să șterg indicele, am avut o eroare");
                                };

                                // _TODO: trimite datele noului index
                                socket.emit('es7reidx', {newidx: nvs, oldidx: idx, deleted: r.body.acknowledged}); // trimit clientului datele
                            });

                        }).catch((err) => {
                            if (err) {
                                console.log("[es7-helper] Am eșuat crearea noului index cu următoarele detalii: ", err)
                                logger.error(err);
                            };
                        });
                    }
                });
            } else {
                // dacă nu există, emite un mesaj de atenționare că ar trebui indexat de la 0. Vezi `reidxfrom0`
                socket.emit('es7reidx', 'Nu s-a putut face reindexarea.');
                console.log('Nu există alias-ul pentru care să se reindexeze!!!');
            }
        }).catch((err) => {
            logger.log(err);
            console.log('La reindexarea incrementală a apărut următoarea eroare: ', err.message);
        });
};

exports.mgdb2es7 = function mgdb2es7 (es7, socket) {
    /** 
     * {
     *  idx: "nume_index",
     *  alsr: "nume_alias"
     * }
    */

    esClient.indices.create({
        index: es7.idx,
        body: resursaRedES7
    }).then((r) => {
        // console.log("[es7-helper::esClient.indices.create] Rezultatul creării indicelui", r);

        // _FIXME: NU creează alias-ul
        if (r.statusCode == 200) {
            esClient.indices.putAlias({
                index: es7.idx,
                name:  es7.alsr
            }).then((r) => {

                // console.log("[es7-helper] Rezultatul creării alias-ului", r);


                // _FIXME: NU SE FACE INDEXAREA CORECT. SUNT INDEXATE DOCs DIN COLECȚIA FIXA A RESURSELOR. FĂ UN MOTOR DE DISCRIMINARE
                // Inițiază un cursor MongoDB
                const cursor = Resursa.find({}).populate('competenteS').cursor();
                cursor.eachAsync(async (doc) => {
                    let obi = Object.assign({}, doc._doc);
                    // verifică dacă există conținut
                    var content2txt = '';
                    if ('content' in obi) {
                        content2txt = editorJs2TXT(obi.content.blocks); // transformă obiectul în text
                    }

                    // indexează documentul
                    const data = {
                        id:               obi._id,
                        date:             obi.date,
                        idContributor:    obi.idContributor,
                        emailContrib:     obi.emailContrib,
                        uuid:             obi.uuid,
                        autori:           obi.autori,
                        langRED:          obi.langRED,
                        title:            obi.title,
                        titleI18n:        obi.titleI18n,
                        arieCurriculara:  obi.arieCurriculara,
                        level:            obi.level,
                        discipline:       obi.discipline,
                        disciplinePropuse:obi.disciplinePropuse,
                        competenteGen:    obi.competenteGen,
                        rol:              obi.rol,
                        abilitati:        obi.abilitati,
                        materiale:        obi.materiale,
                        grupuri:          obi.grupuri,
                        domeniu:          obi.demersuri,
                        spatii:           obi.spatii,
                        invatarea:        obi.invatarea,
                        description:      obi.description,
                        dependinte:       obi.dependinte,
                        coperta:          obi.coperta,
                        content:          content2txt,
                        bibliografie:     obi.bibliografie,
                        contorAcces:      obi.contorAcces,
                        generalPublic:    obi.generalPublic,
                        contorDescarcare: obi.contorDescarcare,
                        etichete:         obi.etichete,
                        utilMie:          obi.utilMie,
                        expertCheck:      obi.expertCheck
                    };
                    await esClient.create({
                        id:      data.id,
                        index:   es7.idx,
                        refresh: true,
                        body:    data
                    });
                    // Ține contul documentelor procesate
                    ++procesate;                    
                });
                console.log(`Am indexat un număr de ${procesate} documente`);
            }).catch((e) => {
                console.error("Nu s-a putut face indexarea", e);
            });
        }
    }).catch(e => {
        console.error(e, `M-am oprit la ${procesate} documente`);
    });
}

/*
CE dorim să indexăm in ES
Unde creăm structura de evidență a fișierelor ce reprezintă mapping-urile? R: Un Map creat chiar în /models și pe care apoi îl încarci aici.
Cum fac require dinamic la fișierele de mapping? Cum faci un require dinamic în Node?
*/


/**
 *Funcția creează index, alias-ul acestuia în baza unui mapping existent
 *
 * @param {*} data
 */
function createIdxAls (data) {
    /*
        {
            idx: "nume_index",
            als: "nume_alias",
            mpg: "nume_mapping"
        }
    */
}