require('dotenv').config();
const esClient     = require('../../elasticsearch.config');
const redisClient  = require('../../redis.config');
const Resursa      = require('../resursa-red');
const logger       = require('../../util/logger');

// const mongoose     = require('../../mongoose.config');
// const CompetentaS  = require('../competenta-specifica');
// const ES7schemaRED = require('../resursa-red-es7');
const editorJs2TXT = require('../../routes/controllers/editorJs2TXT'); 

// setările noului index
const resursaRedES7 = require('../resursa-red-es7'); // '-es7' indică faptul că sunt setările și mappingul noului index
let {getStructure} = require('../../util/es7');

/* INDECȘII ES7 */
let {RES_IDX_ES7 = '', RES_IDX_ALS = '', USR_IDX_ES7 = '', USR_IDX_ALS = ''} = getStructure();
console.log('es7-helper raportează', RES_IDX_ES7, RES_IDX_ALS, USR_IDX_ES7, USR_IDX_ALS);

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
    console.log('[es7-helper.js::deleteIndex] Datele primite sunt: ', data);
    // dacă există și alias pentru index, șterge alias-ul și indexul
    if (data.alsr) {
        delAlias(data);
        delIdx(data);
    }
    return delIdx(data);
};

/**
 * Funcția are rol de helper pentru `deleteIndex()`
 * Sterge un index
 * @param {Object} data Numele indexului și a alias-ului care trebuie șterse `{idx: "nume", alsr: "numeals"}`
 * @returns 
 */
function delIdx (data) {
    return esClient.indices.delete({
        index: data.idx
    }).then((body) => {
        if (body.error) {            
            // console.log('\x1b[33m' + 'Nu am reușit să șterg indexul' + '\x1b[37m');
            // console.log(JSON.stringify(body, null, 4));
            logger.error(body.error);
        }
    }).catch((err) => {
        // console.error(err);
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
        if (body.error) {
            logger.error(body.error);
        }
    }).catch((err) => {
        // console.error(err);
        logger.error(err);
    });
}

/**
 *Funcția are rolul de a șterge un index primit ca valoare și aliasul său
 *Urmat de crearea unui index și a alias-ului său
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

/* 
Strategia este să păstrezi alias-ul și să ștergi indexul. Apoi recreezi indexul și asociezi aliasul vechi.
*/
//- FIXME: termină de adaptat reidx pentru reidxincr 
exports.reidx = function reidx (data) {
    let idx = data.alsr + data.vs,  // Formula este `alsr` + `vs` = numele indexului.
        nvs = '';                   // noua versiune
    /*
    === CREEAZĂ INDEXUL ȘI ALIASUL === INDEXARE DE LA 0
    // Verifică dacă nu cumva există aliasul deja. Șterge-l.
    // Verifică dacă nu cumva există indexul cu numele alias-ului! Șterge-l
    // Creează indexul nou cu mappingul nou.
    */

    // Verifică existența alias-ului
    let valEx = esClient.indices.existsAlias({name: RES_IDX_ALS});

    valEx.then((r) => {
        console.log("Verificarea existenței alias-ului: ", r.statusCode);
        // verifică dacă aliasul există. Dacă există, setează o variabilă cu numele actualului index.
        if (r.statusCode == 200) {
            // verifică cui index aparține alias-ul. 
            esClient.cat.aliases({
                name: RES_IDX_ALS,
                format: "json"     
            }, (err, r) => {
                if (err) console.log(err);
                console.log("Rezultatul interogării alias-urilor ", r.body[0].index);
                RES_IDX_ES7 = r.body[0].index;
                console.log("Acum RES_IDX_ES7 are valoarea: ", RES_IDX_ES7);
                
                // creează unul nou incrementând cifra din componența numelui
                let baseNameIdx = RES_IDX_ES7.slice(0, -1);
                let increasedV = parseInt(RES_IDX_ES7.slice(-1));
                increasedV++;
                let newBaseName = baseNameIdx + increasedV;
                // Crează nou index. La momentul creării indexului, se va crea și alias-ul, care are același nume precum cel vechi.
                esClient.indices.create({
                    index: newBaseName,
                    body: resursaRedES7
                }).then(r => {
                    console.log("Am creat indexul nou cu următorul detaliu: ", r.body);
                    
                    //TODO: Aici vei face reindexarea înregistrărilor din baza de date
                    const cursor = Resursa.find({}).populate('competenteS').cursor();
                    cursor.eachAsync(doc => {
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
                        // creează înregistrare nouă pentru fiecare document în parte
                        esClient.create({
                            id:      data.id,
                            index:   RES_IDX_ALS,
                            refresh: true,
                            body:    data
                        });
                        // Ține contul documentelor procesate
                        ++procesate;                   
                    }).then((r) => {
                        console.log("Am indexat un număr de ", procesate, " documente");
                        process.exit();               
                    }).catch(e => {
                        if (e) {
                            console.error(e, "M-am oprit la ", procesate, " documente");
                        };
                        process.exit();
                    });
                }).catch(e => {
                    if (e) throw e;
                });

                // Șterge indexul vechi
                esClient.indices.delete({
                    index: RES_IDX_ES7
                }, (error, r) => {
                    if (error) console.error(error);
                    console.log("Am șters indexul ", RES_IDX_ES7, " vechi cu următoarele detalii: ", r.statusCode);
                });
            });
        } else { 
            // dacă alias-ul nu există, verifică dacă nu cumva există vreun index cu numele alias-ului. Dacă, da, șterge-l!
            esClient.indices.exists({index: RES_IDX_ALS}).then(r => {
                if (r.statusCode == 200){
                    console.log("În schimb există indexul cu numele alias-ului!");
                    esClient.indices.delete({
                        index: RES_IDX_ALS
                    }).then(r => {
                        console.log("Rezultatul ștergerii indexului care avea numele alias-ului", r.statusCode);
                        // are ca efect ștergerea indexului, cât și a alias-urilor acestuia.
                    });
                }
            }).catch(e => console.error);
            
            // Verifică dacă nu cumva există deja indexul pe care vrei să-l creezi. 
            // Dacă există, creează index nou cu versiune incrementată
            // Reindexează înregistrările din baza de date și abia când totul este OK, șterge-l!
            esClient.indices.exists({
                index: RES_IDX_ES7
            }).then(r => {
                if(r.statusCode == 200){
                    console.log("Indexul deja există și se procedează la crearea unuia nou.");
                    
                    // creează-l din nou incrementând cifra din componența numelui
                    let baseNameIdx = RES_IDX_ES7.slice(0, -1);
                    let increasedV = parseInt(RES_IDX_ES7.slice(-1));
                    increasedV++;
                    let newBaseName = baseNameIdx + increasedV;
                    console.log("Noul nume al indexului este: ", newBaseName);

                    // Crează nou index. La momentul creării indexului, se va crea și alias-ul, care are același nume precum cel vechi.
                    esClient.indices.create({
                        index: newBaseName,
                        body: resursaRedES7
                    }).then(r => {
                        console.log("Am creat indexul nou cu următorul detaliu: ", r.body);
                        
                        //TODO: Aici vei face reindexarea înregistrărilor din baza de date
                        const cursor = Resursa.find({}).populate('competenteS').cursor();
                        cursor.eachAsync(doc => {
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
                            esClient.create({
                                id:      data.id,
                                index:   RES_IDX_ALS,
                                refresh: true,
                                body:    data
                            });
                            // Îne contul celor procesate
                            ++procesate;                        
                        }).then((r) => {
                            console.log("Am indexat un număr de ", procesate, " documente");                       
                        }).catch(e => {
                            if (e) {
                                console.error(e, "M-am oprit la ", procesate, " documente");
                            };
                            process.exit();
                        });
                    }).catch(e => {
                        if (e) {
                            console.error(e)
                        };
                    });

                    // Șterge indexul vechi
                    esClient.indices.delete({
                        index: RES_IDX_ES7
                    }, (error, r) => {
                        if (error) console.error(error);
                        console.log("Am șters indexul vechi cu următoarele detalii: ", r);
                    });
                }
            })
            // Creează indexul nou
            esClient.indices.create({
                index: RES_IDX_ES7,
                body: resursaRedES7
            }).then((result) => {
                console.log("Am creat nou index cu următorul rezultat: ", result.body);
                const cursor = Resursa.find({}).populate('competenteS').cursor();
                cursor.eachAsync(doc => {
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
                    // creează înregistrare nouă pentru fiecare document
                    esClient.create({
                        id:      data.id,
                        index:   RES_IDX_ALS,
                        refresh: true,
                        body:    data
                    });
                    // Ține contul celor procesate
                    ++procesate;
                }).then((r) => {
                    console.log("Am indexat un număr de ", procesate, " documente");
                    process.exit();                       
                }).catch(e => {
                    if (e) {
                        console.error(e, "M-am oprit la ", procesate, " documente");
                    };
                    process.exit();
                });
            }).catch(e => console.error);
        }
    }).catch(e => console.error);
}

exports.reidxincr = function reidxincr () {
        // promisiune de verificare alias
        let valEx = esClient.indices.existsAlias({name: RES_IDX_ALS});
        valEx.then((r) => {
            if (r.statusCode == 200) {
                // dacă aliasul există, procedează la reindexare
                // verifică cui index aparține alias-ul.
                esClient.cat.aliases({
                    name: RES_IDX_ALS,
                    format: "json"     
                }, (err, r) => {
                    if (err) console.error;
                    console.log("Rezultatul interogării alias-urilor ", r.body[0].index);
                });
            } else {
                // dacă nu există, emite un mesaj de atenționare că ar trebui indexat de la 0. Vezi `reidxfrom0`
                console.log('Nu există alias-ul pentru care să se reindexeze!!!');
            }
        }).catch((err) => {
            console.log('La reindexarea incrementală a apărut următoarea eroare: ', err.message);
        });
};