require('dotenv').config();
const esClient     = require('../../elasticsearch.config');
const redisClient  = require('../../redis.config');
const Resursa      = require('../resursa-red');

// const mongoose     = require('../../mongoose.config');
// const CompetentaS  = require('../competenta-specifica');
// const ES7schemaRED = require('../resursa-red-es7');
const editorJs2TXT = require('../../routes/controllers/editorJs2TXT'); 

// setările noului index
const resursaRedES7 = require('../resursa-red-es7'); // '-es7' indică faptul că sunt setările și mappingul noului index

// INDECȘII ES7
const RES_IDX_ES7 = redisClient.get("RES_IDX_ES7", (err, reply) => {
    if (err) console.error;
    return reply;
});
const RES_IDX_ALS = redisClient.get("RES_IDX_ALS", (err, reply) => {
    if (err) console.error;
    return reply;
});
const USR_IDX_ES7 = redisClient.get("USR_IDX_ES7", (err, reply) => {
    if (err) console.error;
    return reply;
});
const USR_IDX_ALS = redisClient.get("USR_IDX_ALS", (err, reply) => {
    if (err) console.error;
    return reply;
});

var procesate = 0;

// TODO: Extrage numărul versiunii indexului (cifra cu care se încheie numele)

/**
 * Funcția are rolul de a verifica dacă indexul (aliasul) există.
 * Dacă indexul nu există va fi creat și va fi indexat primul document.
 * În cazul în care indexul există, va fi indexat documentul dacă acesta nu există deja în index.
 * @param {Object} data Este un obiect care mapează documentul Mongoose și constituie un POJO nou remodelat, dacă e nevoie
 * @param {String} idx Este un string din Redis cu numele indexului ES pentru care s-a constituit alias-ul
 * @param {String} aliasidx Este un string din .env cu numele indexului alias la care trebuie indexată înregistrarea
 */
exports.searchIdxAlCreateDoc = async function searchCreateIdx (schema, data, idx, aliasidx) {
    // console.log(data, idx, aliasidx);
    try {
        // #1 Testează dacă există indexul. Fii foarte atent, testează după alias, nu după indexul pentru care se creează alias-ul.
        await esClient.indices.exists(
            {index: aliasidx}, 
            {errorTrace: true}
        ).then(async function clbkAfterExist (rezultat) {
            // Mai verific încă o dată aici dacă documentul există sau nu chiar dacă am verificat în `resursa-cred` -> vezi mai jos `recExists`.
            try {
                /* === 404 Documentul nu există === */          
                if (rezultat.statusCode === 404) {
                    // console.log("[es7-helper.js] Indexul și alias-ul nu există. Le creez acum!");
                    
                    // creează indexul
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
                }
            } catch (error) {
                if (error) {
                    console.error(JSON.stringify(error.body, null, 2));
                }
            }
        });
    } catch (error) {
        console.error(JSON.stringify(error.body, null, 2));  
    }
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
    }
};

exports.deleteIndex = function (idx) {
    console.log('Deleting old index ...', idx);

    return esClient.indices.delete({
        index: idx,
        ignore: [404]
    }).then((body) => {
        if (!body.error) {
            console.log('\x1b[32m' + 'Am șters indexul fără probleme' + '\x1b[37m');
        } else {                        
            console.log('\x1b[33m' + 'Nu am reușit să șterg indexul' + '\x1b[37m');
            console.log(JSON.stringify(body, null, 4));
        }
    }).catch((err) => {
        console.trace(err.message);
    });
};

/* 
Strategia este să păstrezi alias-ul și să ștergi indexul. Apoi recreezi indexul și asociezi aliasul vechi.
*/
// FIXME: termină de adaptat reidx pentru reidxincr 
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