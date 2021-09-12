Choose which packages to update. @fortawesome/fontawesome-free@5.15.4, multer@1.4.3, pm2@5.1.1, supertest@6.1.6, autoprefixer@10.3.4, @elastic/elasticsearch@7.14.1, bootstrap@5.1.1, datatables.net@1.11.2, datatables.net-dt@1.11.2, elasticdump@6.73.2, isomorphic-git@1.10.0, mocha@9.1.1, socket.io@4.2.0, socket.io-client@4.2.0, webpack-cli@4.8.0, datatables.net-buttons@2.0.0, datatables.net-buttons-dt@2.0.0, globby@12.0.2, mongoose@6.0.5

$ npm install --save @fortawesome/fontawesome-free@5.15.4 multer@1.4.3 pm2@5.1.1 supertest@6.1.6 @elastic/elasticsearch@7.14.1 bootstrap@5.1.1 datatables.net@1.11.2 datatables.net-dt@1.11.2 elasticdump@6.73.2 isomorphic-git@1.10.0 mocha@9.1.1 socket.io@4.2.0 socket.io-client@4.2.0 datatables.net-buttons@2.0.0 datatables.net-buttons-dt@2.0.0 globby@12.0.2 mongoose@6.0.5 --color=always





Update-uri

Patch Update Backwards-compatible bug fixes.
 ◉ isomorphic-git    1.9.1   ❯  1.9.2   https://isomorphic-git.org/
 ◉ mocha             9.0.2   ❯  9.0.3   https://mochajs.org/
 ◉ mongoose          5.13.2  ❯  5.13.5  https://mongoosejs.com
 ◉ socket.io         4.1.2   ❯  4.1.3   https://github.com/socketio/socket.io#readme
 ◉ socket.io-client  4.1.2   ❯  4.1.3   https://github.com/socketio/socket.io-client#readme
 ◉ supertest         6.1.3   ❯  6.1.4   https://github.com/visionmedia/supertest#readme
  
 Minor Update New backwards-compatible features.
 ◉ autocannon devDep    7.3.0   ❯  7.4.0   https://github.com/mcollina/autocannon#readme
 ◉ autoprefixer devDep  10.2.6  ❯  10.3.1  https://github.com/postcss/autoprefixer#readme
 ◉ eslint devDep        7.30.0  ❯  7.32.0  https://eslint.org
 ◉ webpack devDep       5.43.0  ❯  5.47.1  https://github.com/webpack/webpack
  
 Major Update Potentially breaking API changes. Use caution.
❯◉ globby  11.0.4  ❯  12.0.0  https://github.com/sindresorhus/globby#readme



[es7-helper] Rezultatul creării indicelui {
  body: { acknowledged: true, shards_acknowledged: true, index: 'users0' },
  statusCode: 200,
  headers: {
    warning: '299 Elasticsearch-7.13.4-c5f60e894ca0c61cdbae4f5a686d9f08bcefc942 "Elasticsearch built-in security features are not enabled. Without authentication, your cluster could be accessible to anyone. See https://www.elastic.co/guide/en/elasticsearch/reference/7.13/security-minimal-setup.html to enable security."',
    'content-type': 'application/json; charset=UTF-8',
    'content-length': '65'
  },
  meta: {
    context: null,
    request: { params: [Object], options: {}, id: 13 },
    name: 'elasticsearch-js',
    connection: {
      url: 'http://127.0.0.1:9200/',
      id: 'VExS2n4DS8KpqxkqKr_njg',
      headers: {},
      deadCount: 0,
      resurrectTimeout: 0,
      _openRequests: 0,
      status: 'alive',
      roles: [Object]
    },
    attempts: 0,
    aborted: false
  }
}
[es7-helper] Rezultatul creării alias-ului {
  body: { acknowledged: true },
  statusCode: 200,
  headers: {
    warning: '299 Elasticsearch-7.13.4-c5f60e894ca0c61cdbae4f5a686d9f08bcefc942 "Elasticsearch built-in security features are not enabled. Without authentication, your cluster could be accessible to anyone. See https://www.elastic.co/guide/en/elasticsearch/reference/7.13/security-minimal-setup.html to enable security."',
    'content-type': 'application/json; charset=UTF-8',
    'content-length': '21'
  },
  meta: {
    context: null,
    request: { params: [Object], options: {}, id: 14 },
    name: 'elasticsearch-js',
    connection: {
      url: 'http://127.0.0.1:9200/',
      id: 'VExS2n4DS8KpqxkqKr_njg',
      headers: {},
      deadCount: 0,
      resurrectTimeout: 0,
      _openRequests: 0,
      status: 'alive',
      roles: [Object]
    },
    attempts: 0,
    aborted: false
  }
}
Am indexat un număr de 0 documente








[es7-helper.js::deleteIndex] Datele primite sunt:  { idx: 'users0', alsr: 'users' }
[13-07-2021 09:23:43] [error] [undefined]:      aliases_not_found_exception: [aliases_not_found_exception] Reason: aliases [users] missing
[13-07-2021 09:23:43] [error] [undefined]:      aliases_not_found_exception: [aliases_not_found_exception] Reason: aliases [users] missing
[13-07-2021 09:23:43] [error] [undefined]:      index_not_found_exception: [index_not_found_exception] Reason: no such index [users0]
[13-07-2021 09:23:43] [error] [undefined]:      index_not_found_exception: [index_not_found_exception] Reason: no such index [users0]
   
   
   
   
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
                                
                                // _TODO: Aici vei face reindexarea înregistrărilor din baza de date
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




Alias-ul resedus există? R:  true , iar indexul ar trebui să fie:  resedus1
Alias-ul resedus aparține indexului:  resedus1
Noul nume al indexului este:  resedus2
Am creat indexul nou cu următorul detaliu:  { acknowledged: true, shards_acknowledged: true, index: 'resedus2' }
[es7-helper] Am eșuat crearea noului index cu următoarele detalii:  ReferenceError: alsr is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:360:39
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
[08-07-2021 11:59:15] [error] [undefined]:      alsr is not defined
[08-07-2021 11:59:15] [error] [undefined]:      alsr is not defined



[es7-helper.js::deleteIndex] Datele primite sunt:  { idx: 'resedus2', alsr: 'resedus' }
[08-07-2021 11:58:32] [error] [undefined]:      index_not_found_exception: [index_not_found_exception] Reason: no such index [resedus2]
[08-07-2021 11:58:32] [error] [undefined]:      index_not_found_exception: [index_not_found_exception] Reason: no such index [resedus2]



Am creat indexul nou cu următorul detaliu:  { acknowledged: true, shards_acknowledged: true, index: 'resedus2' }
[es7-helper] Am eșuat crearea noului index cu următoarele detalii:  ResponseError: script_exception: [script_exception] Reason: compile error
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:337:23)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:264:11)
    at IncomingMessage.emit (node:events:406:35)
    at endReadableNT (node:internal/streams/readable:1329:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
  meta: {
    body: { error: [Object], status: 400 },
    statusCode: 400,
    headers: {
      warning: '299 Elasticsearch-7.13.3-5d21bea28db1e89ecc1f66311ebdec9dc3aa7d64 "Elasticsearch built-in security features are not enabled. Without authentication, your cluster could be accessible to anyone. See https://www.elastic.co/guide/en/elasticsearch/reference/7.13/security-minimal-setup.html to enable security."',
      'content-type': 'application/json; charset=UTF-8',
      'content-length': '506'
    },
    meta: {
      context: null,
      request: [Object],
      name: 'elasticsearch-js',
      connection: [Object],
      attempts: 0,
      aborted: false
    }
  }
}
[08-07-2021 11:52:30] [error] [undefined]:      script_exception: [script_exception] Reason: compile error
[08-07-2021 11:52:30] [error] [undefined]:      script_exception: [script_exception] Reason: compile error

Pentru că funcționalitățile pachetului `uuid` au început să se regăsească în pachetul `crypto` al Node.js, am migrat funcționalitățile pentru generarea UUID-ului.



Patch Update Backwards-compatible bug fixes.
❯◯ datatables.net                1.10.24  ❯  1.10.25  https://datatables.net
 ◯ datatables.net-buttons        1.7.0    ❯  1.7.1    https://datatables.net
 ◯ datatables.net-buttons-dt     1.7.0    ❯  1.7.1    https://datatables.net
 ◯ datatables.net-responsive     2.2.7    ❯  2.2.9    https://datatables.net
 ◯ datatables.net-responsive-dt  2.2.7    ❯  2.2.9    https://datatables.net
 ◯ express-session               1.17.1   ❯  1.17.2   https://github.com/expressjs/session#readme
 ◯ globby                        11.0.3   ❯  11.0.4   https://github.com/sindresorhus/globby#readme
 ◯ isomorphic-git                1.8.2    ❯  1.8.10   https://isomorphic-git.org/
 ◯ papaparse                     5.3.0    ❯  5.3.1    http://papaparse.com
 ◯ winston-daily-rotate-file     4.5.3    ❯  4.5.5    https://github.com/winstonjs/winston-daily-rotate-file#readme
 ◯ autoprefixer devDep           10.2.5   ❯  10.2.6   https://github.com/postcss/autoprefixer#readme
  
 Minor Update New backwards-compatible features.
 ◉ @elastic/elasticsearch  7.12.0  ❯  7.13.0  http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 ◉ express-rate-limit      5.2.6   ❯  5.3.0   https://github.com/nfriedly/express-rate-limit
❯◉ mongoose                5.12.7  ❯  5.13.0  https://mongoosejs.com
 ◯ socket.io               4.0.1   ❯  4.1.2   https://github.com/socketio/socket.io#readme
 ◯ socket.io-client        4.0.1   ❯  4.1.2   https://github.com/socketio/socket.io-client#readme
 ◯ autocannon devDep       7.2.0   ❯  7.3.0   https://github.com/mcollina/autocannon#readme
 ◯ eslint devDep           7.25.0  ❯  7.29.0  https://eslint.org
 ◯ webpack devDep          5.36.2  ❯  5.42.0  https://github.com/webpack/webpack
 ◯ webpack-cli devDep      4.6.0   ❯  4.7.2   https://github.com/webpack/webpack-cli/tree/master/packages/webpack-cli
  
 Major Update Potentially breaking API changes. Use caution.
 ◯ bootstrap                   4.6.0    ❯  5.0.2   https://getbootstrap.com/
 ◯ connect-redis               5.2.0    ❯  6.0.0   https://github.com/visionmedia/connect-redis#readme
 ◯ datatables.net-bs4          1.10.24  ❯  3.2.2   https://datatables.net
 ◯ dotenv                      8.2.0    ❯  10.0.0  https://github.com/motdotla/dotenv#readme
 ◯ fs-extra                    9.1.0    ❯  10.0.0  https://github.com/jprichardson/node-fs-extra
 ◯ mocha                       8.3.2    ❯  9.0.1   https://mochajs.org/
 ◯ passport-twitter            0.1.5    ❯  1.0.4   https://github.com/jaredhanson/passport-twitter#readme
 ◯ pm2                         4.5.6    ❯  5.1.0   http://pm2.keymetrics.io/
 ◯ copy-webpack-plugin devDep  8.1.1    ❯  9.0.1   https://github.com/webpack-contrib/copy-webpack-plugin

 Non-Semver Versions less than 1.0.0, caution.
❯◉ i18n  0.13.2  ❯  0.13.3  http://github.com/mashpie/i18n-node







https://redislabs.com/blog/goodbye-cache-redis-as-a-primary-database/


[es7-helper.js::deleteIndex] Datele primite sunt:  { idx: 'users' }
ResponseError: illegal_argument_exception
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:337:23)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:264:11)
    at IncomingMessage.emit (node:events:377:35)
    at endReadableNT (node:internal/streams/readable:1312:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
  meta: {
    body: { error: [Object], status: 400 },
    statusCode: 400,
    headers: {
      warning: '299 Elasticsearch-7.13.0-5ca8591c6fcdb1260ce95b08a8e023559635c6f3 "Elasticsearch built-in security features are not enabled. Without authentication, your cluster could be accessible to anyone. See https://www.elastic.co/guide/en/elasticsearch/reference/7.13/security-minimal-setup.html to enable security."',
      'content-type': 'application/json; charset=UTF-8',
      'content-length': '253'
    },
    meta: {
      context: null,
      request: [Object],
      name: 'elasticsearch-js',
      connection: [Object],
      attempts: 0,
      aborted: false
    }
  }
}
[01-06-2021 13:10:24] [error] [undefined]:      illegal_argument_exception
[01-06-2021 13:10:24] [error] [undefined]:      illegal_argument_exception







Am introdus în modelul datelor specificația de rating cu următoarele detalii.

    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }



Actualizarea înregistrărilor pentru o colecție

https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/
https://stackoverflow.com/questions/7714216/add-new-field-to-every-document-in-a-mongodb-collection
https://stackoverflow.com/questions/36228599/how-to-use-mongoose-model-schema-with-dynamic-keys
https://github.com/Automattic/mongoose/issues/1867
https://mongoosejs.com/docs/guide.html#strict




Lucru pentru a realiza un mecanism de upload al imaginilor folosind Socket.IO

https://www.digitalocean.com/community/tutorials/how-to-add-advanced-photo-uploads-in-node-and-express
https://bezkoder.com/node-js-upload-resize-multiple-images/
https://coderszine.com/upload-multiple-image-in-node-js/
https://medium.com/swlh/video-streaming-using-opencv4nodejs-with-node-js-express-and-socket-io-3806abb049a
https://www.npmjs.com/package/socketio-file-upload
https://iabhishek.dev/post/building-a-multimedia-chat-app-using-expres-socketio-redis-and-docker-part-1
https://iabhishek.dev/post/building-a-multimedia-chat-app-using-express-socketio-redis-and-docker-part-2
https://iabhishek.dev/post/building-a-multimedia-chat-app-using-express-socketio-redis-and-docker-part-3

https://docs.mongodb.com/manual/tutorial/deploy-replica-set-for-testing/
https://medium.com/swlh/build-your-own-realtime-database-with-socket-io-and-mongodb-1c561c2bb87
https://hackernoon.com/enforcing-a-single-web-socket-connection-per-user-with-node-js-socket-io-and-redis-65f9eb57f66a


ReferenceError: next is not defined
    at /var/www/red.educred.ro/routes/upload.js:178:25
Error: EACCES: permission denied, mkdir '/var/www/red.educred.ro/repo/5dc05a3e6b20115bd629aac5'
    at Object.mkdirSync (node:fs:1325:3)
    at sync (/var/www/red.educred.ro/node_modules/bagit-fs/node_modules/mkdirp/index.js:72:13)
    at sync (/var/www/red.educred.ro/node_modules/bagit-fs/node_modules/mkdirp/index.js:78:24)
    at Function.sync (/var/www/red.educred.ro/node_modules/bagit-fs/node_modules/mkdirp/index.js:78:24)
    at new BagIt (/var/www/red.educred.ro/node_modules/bagit-fs/index.js:29:10)
    at BagIt (/var/www/red.educred.ro/node_modules/bagit-fs/index.js:15:40)
    at /var/www/red.educred.ro/routes/sockets.js:274:31 {
  errno: -13,
  syscall: 'mkdir',
  code: 'EACCES',
  path: '/var/www/red.educred.ro/repo/5dc05a3e6b20115bd629aac5'
}

{ "_id" : ObjectId("60994a345333df1b975aa6d9"), "date" : ISODate("2021-05-10T14:59:00.460Z"), "title" : "Un eford de câteva luni", "idContributor" : "nicu.constantinescu@educred.ro", "content" : { "time" : 1620658740455, "blocks" : [ { "id" : "8AHG184qGi", "type" : "paragraph", "data" : { "text" : "Astăzi a fost instalată versiunea 0.9.7 a aplicației colectorului. Este un efort de câteva luni pentru a actualiza și a îmbunătăți baza de cod. În plus, în vederea unei ușoare portări cu scopul de a mări numărul celor care doresc să se implice în dezvoltare software, întregul cod a fost pe volume gestionabile cu Docker.&nbsp;" } }, { "id" : "kCo-VngD2S", "type" : "paragraph", "data" : { "text" : "Toate eforturile sunt îndreptate în acest moment spre corectarea datelor interne." } }, { "id" : "Pa98uRZg_j", "type" : "paragraph", "data" : { "text" : "Aplicația a suferit și o acualizare a interfeței, dar formularul pentru introducerea resurselor a rămas neschimbat pentru a nu crea nicio discrepanță cu experiența de lucru de până acum." } }, { "id" : "vNbx_wto-A", "type" : "paragraph", "data" : { "text" : "Vă mulțumesc tuturor pentru răbdare. Următoarea etapă după cea a corecturilor și ajustărilor de date, va fi dedicată îmbunătățirii bazei de cod existente dedicate motorului de căutare. Astfel, în acestă versiune căutare nu este disponibilă." } }, { "id" : "hpHKR8Zsg5", "type" : "image", "data" : { "caption" : "", "withBorder" : false, "stretched" : false, "withBackground" : false } } ], "version" : "2.21.0" }, "contorAcces" : 0, "__v" : 0 }




0|app  | TypeError: Cannot read property 'url' of undefined
0|app  |     at /var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:23:59
0|app  |     at Array.map (<anonymous>)
0|app  |     at content2html (/var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:7:24)
0|app  |     at clbkLogAdd (/var/www/red.educred.ro/routes/log.js:30:34)
0|app  |     at Array.map (<anonymous>)
0|app  |     at /var/www/red.educred.ro/routes/log.js:26:21
0|app  |     at processTicksAndRejections (node:internal/process/task_queues:96:5)
0|app  | Aplicația a crăpat cu următoarele detalii:  TypeError: Cannot read property 'url' of undefined
0|app  |     at /var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:23:59
0|app  |     at Array.map (<anonymous>)
0|app  |     at content2html (/var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:7:24)
0|app  |     at clbkLogAdd (/var/www/red.educred.ro/routes/log.js:30:34)
0|app  |     at Array.map (<anonymous>)
0|app  |     at /var/www/red.educred.ro/routes/log.js:26:21
0|app  |     at processTicksAndRejections (node:internal/process/task_queues:96:5)
0|app  | [10-05-2021 18:00:10] [error] [undefined]: 	Cannot read property 'url' of undefined
0|app  | [10-05-2021 18:00:10] [error] [undefined]: 	Cannot read property 'url' of undefined
0|app  | GET /log 302 11.741 ms - 52
0|app  | GET /500 500 12.943 ms - -
0|app  | TypeError: Cannot read property 'url' of undefined
0|app  |     at /var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:23:59
0|app  |     at Array.map (<anonymous>)
0|app  |     at content2html (/var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:7:24)
0|app  |     at clbkLogAdd (/var/www/red.educred.ro/routes/log.js:30:34)
0|app  |     at Array.map (<anonymous>)
0|app  |     at /var/www/red.educred.ro/routes/log.js:26:21
0|app  |     at processTicksAndRejections (node:internal/process/task_queues:96:5)
0|app  | Aplicația a crăpat cu următoarele detalii:  TypeError: Cannot read property 'url' of undefined
0|app  |     at /var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:23:59
0|app  |     at Array.map (<anonymous>)
0|app  |     at content2html (/var/www/red.educred.ro/routes/controllers/editorJs2HTML.js:7:24)
0|app  |     at clbkLogAdd (/var/www/red.educred.ro/routes/log.js:30:34)
































0|app  |     at Array.map (<anonymous>)
0|app  |     at /var/www/red.educred.ro/routes/log.js:26:21
0|app  |     at processTicksAndRejections (node:internal/process/task_queues:96:5)
0|app  | [10-05-2021 18:01:30] [error] [undefined]: 	Cannot read property 'url' of undefined
0|app  | [10-05-2021 18:01:30] [error] [undefined]: 	Cannot read property 'url' of undefined








socket.on('delresid'

AM DEZACTIVAT CODUL DE STERGERE DIN INDEX ES!!! REACTIVEAZA!


Căile formate sunt:  repo/5e9832fcf052494338584d92/f1d06596-2878-4d09-b939-ab20b5a404c0 repo/5e9832fcf052494338584d92/deleted repo/5e9832fcf052494338584d92/deleted/f1d06596-2878-4d09-b939-ab20b5a404c0
[sockets.js::'delresid'] Acest id am să incerc să-l șterg. Acum îl caut în Mongoose:  6097ed16531dfaf084e9b6bf
[app.js] A apărut un "uncaughtException" cu detaliile:  index is not defined
[09-05-2021 17:09:57] [error] [undefined]:      index is not defined ReferenceError: index is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:683:163
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:339:9)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:264:11)
    at IncomingMessage.emit (node:events:377:35)
    at endReadableNT (node:internal/streams/readable:1312:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
[09-05-2021 17:09:57] [error] [undefined]:      index is not defined ReferenceError: index is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:683:163
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:339:9)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:264:11)
    at IncomingMessage.emit (node:events:377:35)
    at endReadableNT (node:internal/streams/readable:1312:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
Procesul a fost încheiat având codul:  1
[nodemon] app crashed - waiting for file changes before starting...





AM dezafectat codul care face indexare în profile/cod_resursă. Voi reactiva cand reconstruiesc sistemul de indexare 


undefined

[09-05-2021 16:47:23] [error] [undefined]:      Cannot read property 'exists' of undefined
[09-05-2021 16:47:23] [error] [undefined]:      Cannot read property 'exists' of undefined

(node:60048) Warning: Accessing non-existent property 'indices' of module exports inside circular dependency
    at emitCircularRequireWarning (node:internal/modules/cjs/loader:703:11)
    at Object.get (node:internal/modules/cjs/loader:717:5)
    at Object.searchCreateIdx [as searchIdxAndCreateDoc] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/model-helpers/es7-helper.js:99:35)
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/profile.js:246:31
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
GET /profile/6097e7e9448834e95b3fc3c5 200 134.498 ms - -
Căile formate sunt:  repo/5e9832fcf052494338584d92/c17f02a9-7e16-428d-8773-bb6af6a4f8a7 repo/5e9832fcf052494338584d92/deleted repo/5e9832fcf052494338584d92/deleted/c17f02a9-7e16-428d-8773-bb6af6a4f8a7
[sockets.js::'delresid'] Acest id am să incerc să-l șterg. Acum îl caut în Mongoose:  6097e7e9448834e95b3fc3c5
[app.js] A apărut un "uncaughtException" cu detaliile:  index is not defined
[09-05-2021 16:48:49] [error] [undefined]:      index is not defined ReferenceError: index is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:682:163
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:339:9)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:264:11)
    at IncomingMessage.emit (node:events:377:35)
    at endReadableNT (node:internal/streams/readable:1312:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
[09-05-2021 16:48:49] [error] [undefined]:      index is not defined ReferenceError: index is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:682:163
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:339:9)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:264:11)
    at IncomingMessage.emit (node:events:377:35)
    at endReadableNT (node:internal/streams/readable:1312:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
Procesul a fost încheiat având codul:  1
[nodemon] app crashed - waiting for file changes before starting...




[app.js] O promisiune a fost respinsă fără a fi tratată respingerea Promise {
  <rejected> ReferenceError: RES_IDX_ES7 is not defined
      at model.clbkPostSave1 (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/resursa-red.js:182:5)
      at callMiddlewareFunction (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:483:23)
      at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:194:9)
      at Kareem.execPost (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:218:3)
      at _cb (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:308:15)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/model.js:418:5
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/model.js:293:7
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/utils.js:697:5
      at executeCallback (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/operations/execute_operation.js:65:7)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/operations/insert_one.js:34:21
      at handleCallback (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/utils.js:102:55)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/operations/common_functions.js:262:5
      at handler (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/core/sdam/topology.js:944:24)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/cmap/connection_pool.js:350:13
      at handleOperationResult (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/core/sdam/server.js:558:5)
      at MessageStream.messageHandler (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/cmap/connection.js:277:5)
      at MessageStream.emit (node:events:365:28)
      at processIncomingData (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/cmap/message_stream.js:144:12)
      at MessageStream._write (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongodb/lib/cmap/message_stream.js:42:5)
      at writeOrBuffer (node:internal/streams/writable:389:12)
      at _write (node:internal/streams/writable:330:10)
      at MessageStream.Writable.write (node:internal/streams/writable:334:10)
}  având motivul ReferenceError: RES_IDX_ES7 is not defined



httpstatuses.com

Patch Update Backwards-compatible bug fixes.
❯◯ @fortawesome/fontawesome-free  5.15.2   ❯  5.15.3   https://fontawesome.com
 ◯ datatables.net                 1.10.23  ❯  1.10.24  https://datatables.net
 ◯ datatables.net-bs4             1.10.23  ❯  1.10.24  https://datatables.net
 ◯ datatables.net-dt              1.10.23  ❯  1.10.24  https://datatables.net
 ◯ datatables.net-select          1.3.1    ❯  1.3.3    https://datatables.net
 ◯ datatables.net-select-dt       1.3.1    ❯  1.3.3    https://datatables.net
 ◯ globby                         11.0.2   ❯  11.0.3   https://github.com/sindresorhus/globby#readme
 ◯ isomorphic-git                 1.8.1    ❯  1.8.2    https://isomorphic-git.org/
 ◯ mocha                          8.3.1    ❯  8.3.2    https://mochajs.org/
 ◯ pm2                            4.5.5    ❯  4.5.6    http://pm2.keymetrics.io/
 ◯ winston-daily-rotate-file      4.5.0    ❯  4.5.3    https://github.com/winstonjs/winston-daily-rotate-file#readme
  
Minor Update New backwards-compatible features.
 ◯ @elastic/elasticsearch      7.11.0   ❯  7.12.0  http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 ◯ connect-redis               5.1.0    ❯  5.2.0   https://github.com/visionmedia/connect-redis#readme
 ◯ datatables.net-buttons      1.6.5    ❯  1.7.0   https://datatables.net
 ◯ datatables.net-buttons-dt   1.6.5    ❯  1.7.0   https://datatables.net
 ◯ express-hbs                 2.3.4    ❯  2.4.0   https://github.com/TryGhost/express-hbs
 ◯ helmet                      4.4.1    ❯  4.6.0   https://helmetjs.github.io/
 ◯ mongoose                    5.11.13  ❯  5.12.7  https://mongoosejs.com
 ◯ redis                       3.0.2    ❯  3.1.2   https://github.com/NodeRedis/node-redis
 ◯ validator                   13.5.2   ❯  13.6.0  https://github.com/validatorjs/validator.js
 ◯ autocannon devDep           7.0.5    ❯  7.2.0   https://github.com/mcollina/autocannon#readme
 ◯ copy-webpack-plugin devDep  8.0.0    ❯  8.1.1   https://github.com/webpack-contrib/copy-webpack-plugin
 ◯ eslint devDep               7.22.0   ❯  7.25.0  https://eslint.org
 ◯ webpack devDep              5.24.3   ❯  5.36.2  https://github.com/webpack/webpack
 ◯ webpack-cli devDep          4.5.0    ❯  4.6.0   https://github.com/webpack/webpack-cli
  
 Major Update Potentially breaking API changes. Use caution.
 ◯ socket.io         3.1.2  ❯  4.0.1  https://github.com/socketio/socket.io#readme
 ◯ socket.io-client  3.1.2  ❯  4.0.1  https://github.com/socketio/socket.io-client#readme

npm install --save @fortawesome/fontawesome-free@5.15.3 datatables.net@1.10.24 datatables.net-bs4@1.10.24 datatables.net-dt@1.10.24 datatables.net-select@1.3.3 datatables.net-select-dt@1.3.3 globby@11.0.3 isomorphic-git@1.8.2 mocha@8.3.2 pm2@4.5.6 winston-daily-rotate-file@4.5.3 @elastic/elasticsearch@7.12.0 connect-redis@5.2.0 datatables.net-buttons@1.7.0 datatables.net-buttons-dt@1.7.0 express-hbs@2.4.0 helmet@4.6.0 mongoose@5.12.7 redis@3.1.2 validator@13.6.0 socket.io@4.0.1 socket.io-client@4.0.1 --color=always

added 5 packages, removed 37 packages, changed 58 packages, and audited 1289 packages in 31s

85 packages are looking for funding
  run `npm fund` for details

3 low severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.


$ npm install --save-dev autocannon@7.2.0 copy-webpack-plugin@8.1.1 eslint@7.25.0 webpack@5.36.2 webpack-cli@4.6.0 --color=always

added 1 package, changed 12 packages, and audited 1290 packages in 5s

85 packages are looking for funding
  run `npm fund` for details

3 low severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

npm audit report

xmldom  <0.5.0
Misinterpretation of malicious XML input - https://npmjs.com/advisories/1650
fix available via `npm audit fix --force`
Will install passport-twitter@0.1.5, which is a breaking change
node_modules/xmldom
  xtraverse  *
  Depends on vulnerable versions of xmldom
  node_modules/xtraverse
    passport-twitter  >=1.0.0
    Depends on vulnerable versions of xtraverse
    node_modules/passport-twitter

3 low severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force



Actualizare la versiunea 2.21.0 a pachetului Editor.js.


https://r-future.github.io/post/how-to-fix-redis-warnings-with-docker/


Dacă ai erori de tipul
ERROR: for redcolectordevel  Container "64467f7e2e99" is unhealthy.
ERROR: Encountered errors while bringing up the project.

Verifică folosind docker-compose ps pentru a vedea starea tuturor containerelor active
Poți investiga fiecare container individual cu:
docker inspect  --format "{{json .State.Health }}" nume_container_sau_id  | jq
sau
docker inspect --format "{{json .State.Health }}" $(docker-compose ps -q) | jq

docker-compose up in the first terminal window, and docker-compose logs -f in another. This will display all logs from docker-compose-managed containers.


Și dacă ai o eroare de citire de socket:
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/64467f7e2e99/json: dial unix /var/run/docker.sock: connect: permission denied

Atunci e o groblemă pentru că folosești docker drept root!!!
Vezi: https://docs.docker.com/engine/install/linux-postinstall/
Vezi: https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket

sudo groupadd docker
groupadd: group 'docker' already exists

sudo usermod -aG docker $USER




Am introdus o variabilă de mediu nouă necesară pregătirii saltului aplicației la posibilitatea de a fi rulată virtualizat: APP_RUNTIME=local
Această variabilă de mediu poate avea două valori: `local` | `virtual`

Actualizare editor de la versiunea 2.20.1 la 2.20.2.

http://localhost:8080/profile/6063439394f7007d68138c05

{
  "error": {
    "root_cause": [
      {
        "type": "invalid_alias_name_exception",
        "reason": "Invalid alias name [false], an index exists with the same name as the alias",
        "index_uuid": "H8XDS7EvSJuw4ELntKVNbQ",
        "index": "false"
      }
    ],
    "type": "invalid_alias_name_exception",
    "reason": "Invalid alias name [false], an index exists with the same name as the alias",
    "index_uuid": "H8XDS7EvSJuw4ELntKVNbQ",
    "index": "false"
  },
  "status": 400
}

Actualizare editor de la versiunea 2.19.1 la 2.20.1.

```javascript
// webminer.js
import fs                from 'fs'
import path              from 'path'
import superagent        from 'superagent'
import mkdirp            from 'mkdirp'
import { urlToFilename } from './utils.js'

export function webminer (url, cb) {
  const filename = urlToFilename(url);

  // dacă fișierul nu există
  fs.access(filename, err => {
    if (err && err.code === 'ENOENT') {

      // poți purcede la crearea structurii
      console.log(`Downloading ${url} into ${filename}`);

      // descarcă pagina
      superagent.get(url).end((err, res) => {
        if (err) {
          // cb(err);
          return cb(err); // early return principle
        } else {

          // construiește un director al cărui nume va fi numele fișierului
          mkdirp(path.dirname(filename), err => {
            if (err) {
              // cb(err);
              return cb(err);
            } else {

              // scrie fișierul
              fs.writeFile(filename, res.text, err => {
                  if (err) {
                    // cb(err);
                    return cb(err);
                  } else {
                    // apelează callback-ul final
                    cb(null, filename, true);
                  }
              })
            }
          })
        }
      })
    } else {
      // apelează callback-ul final
      cb(null, filename, false);
    }
  });
}

// webminecli.js
import { spider } from './webminer.js'
webminer(process.argv[2], (err, filename, downloaded) => {
  if (err) {
    console.error(err)
  } else if (downloaded) {
    console.log(`Completed the download of "${filename}"`)
  } else {
    console.log(`"${filename}" was already downloaded`)
  }
});
```


Am instalat eslint

eslint --init
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JSON
Successfully created .eslintrc.json file in /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector



Eroare apărută la ștergerea de un utilizator simplu (video@educred.ro) a unei resurse:

Căile formate sunt:  repo/5eb10e121891c80a029c42c0/433ce46c-1afd-404c-878b-f72a8c8961fa repo/5eb10e121891c80a029c42c0/deleted repo/5eb10e121891c80a029c42c0/deleted/433ce46c-1afd-404c-878b-f72a8c8961fa
Acest id am să incerc să-l șterg. Acum îl caut în Mongoose:  60476a3b59b46c33ae5a5c74

ES7 sniff:  Nicio problemă detectată la inițializare!!! All norminal 👌

[sockets.js::'delresid'] În timpul ștergerii din Elasticsearch, a apărut eroarea ResponseError: illegal_argument_exception


[app.js] A apărul un uncaughtException cu detaliile  index is not defined
[09-03-2021 14:49:08] [error] [undefined]:      ReferenceError: index is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:637:158
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:335:9)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:260:11)
    at IncomingMessage.emit (node:events:391:22)
    at endReadableNT (node:internal/streams/readable:1307:12)
    at processTicksAndRejections (node:internal/process/task_queues:81:21)
[09-03-2021 14:49:08] [error] [undefined]:      ReferenceError: index is not defined
    at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/routes/sockets.js:637:158
    at onBody (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:335:9)
    at IncomingMessage.onEnd (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/lib/Transport.js:260:11)
    at IncomingMessage.emit (node:events:391:22)
    at endReadableNT (node:internal/streams/readable:1307:12)
    at processTicksAndRejections (node:internal/process/task_queues:81:21)
Procesul a fost încheiat având codul:  1



[08-03-2021 13:12:00] [error] [undefined]:      [/util::backupMongo] A apărut o eroare la comanda de ștergerea backup-ului MongoDB  Command failed: mongodump --host localhost --port 27017 --db redcolector --username kosson --password acid77burn --out /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/util/backup-mongodump-2021-3-8
2021-03-08T13:12:00.117+0200    Failed: can't create session: could not connect to server: connection() : auth error: sasl conversation error: unable to authenticate using mechanism "SCRAM-SHA-1": (AuthenticationFailed) Authentication failed.

[08-03-2021 13:12:00] [error] [undefined]:      [/util::backupMongo] A apărut o eroare la comanda de ștergerea backup-ului MongoDB  Command failed: mongodump --host localhost --port 27017 --db redcolector --username kosson --password acid77burn --out /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/util/backup-mongodump-2021-3-8
2021-03-08T13:12:00.117+0200    Failed: can't create session: could not connect to server: connection() : auth error: sasl conversation error: unable to authenticate using mechanism "SCRAM-SHA-1": (AuthenticationFailed) Authentication failed.

^CProcesul a fost întrerupt (CTRL+C). Închid procesul 12759! Data:  2021-03-08T11:33:30.105Z




npm-check -u
? Choose which packages to update. (Press <space> to select)
  
 Patch Update Backwards-compatible bug fixes.
❯◯ bcrypt               5.0.0    ❯  5.0.1    https://github.com/kelektiv/node.bcrypt.js#readme
 ◯ mocha                8.3.0    ❯  8.3.1    https://mochajs.org/
 ◯ mongoose             5.11.13  ❯  5.11.19  https://mongoosejs.com
 ◯ socket.io            3.1.1    ❯  3.1.2    https://github.com/socketio/socket.io#readme
 ◯ socket.io-client     3.1.1    ❯  3.1.2    https://github.com/socketio/socket.io-client#readme
 ◯ autocannon devDep    7.0.4    ❯  7.0.5    https://github.com/mcollina/autocannon#readme
 ◯ autoprefixer devDep  10.2.4   ❯  10.2.5   https://github.com/postcss/autoprefixer#readme
 ◯ webpack devDep       5.24.0   ❯  5.24.3   https://github.com/webpack/webpack
  
 Minor Update New backwards-compatible features.
 ◯ archiver  5.2.0  ❯  5.3.0  https://github.com/archiverjs/node-archiver
 ◯ jquery    3.5.1  ❯  3.6.0  https://jquery.com
  
 Major Update Potentially breaking API changes. Use caution.
 ◯ copy-webpack-plugin devDep  7.0.0  ❯  8.0.0  https://github.com/webpack-contrib/copy-webpack-plugin

După actualizarea lui mongoose la versiunea 5.11.19, problemele nu au dispărut. Am procedat la reinstalarea versiunii 5.11.13.


Actualizare pm2

npm audit
# npm audit report

systeminformation  <5.3.1
Severity: moderate
Command Injection - https://npmjs.com/advisories/1628
fix available via `npm audit fix`
node_modules/systeminformation
  pm2  4.0.0 - 4.5.4
  Depends on vulnerable versions of systeminformation
  node_modules/pm2

2 moderate severity vulnerabilities




Realizarea unui backup automat și la comandă

Am instalat npm install node-cron --save


https://zaiste.net/posts/nodejs-child-process-spawn-exec-fork-async-await/
https://nodejs.org/en/knowledge/child-processes/how-to-spawn-a-child-process/
https://docs.bitnami.com/ibm/apps/lets-chat/administration/backup-restore-mongodb/
https://dev.to/yasseryka/how-to-backup-mongodb-every-night-in-nodejs-257o
https://levelup.gitconnected.com/how-to-set-up-scheduled-mongodb-backups-with-a-bit-of-node-js-b81abebfa20


[app.js] O promisiune a fost respinsă fără a fi tratată respingerea Promise {
  <rejected> ConfigurationError: Missing required parameter: index
      at Client.existsApi [as exists] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/api/api/exists.js:38:17)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:83:47
      at Array.map (<anonymous>)
      at model.Query.clbkUsrFind (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:82:17)
      at callMiddlewareFunction (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:483:23)
      at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:194:9)
      at Kareem.execPost (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:218:3)
      at _cb (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:308:15)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/query.js:4435:12
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/helpers/query/completeMany.js:35:39
      at processTicksAndRejections (node:internal/process/task_queues:76:11)
}  având motivul ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index


[app.js] O promisiune a fost respinsă fără a fi tratată respingerea Promise {
  <rejected> ConfigurationError: Missing required parameter: index
      at Client.existsApi [as exists] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/api/api/exists.js:38:17)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:83:47
      at Array.map (<anonymous>)
      at model.Query.clbkUsrFind (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:82:17)
      at callMiddlewareFunction (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:483:23)
      at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:194:9)
      at Kareem.execPost (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:218:3)
      at _cb (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:308:15)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/query.js:4435:12
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/helpers/query/completeMany.js:35:39
      at processTicksAndRejections (node:internal/process/task_queues:76:11)
}  având motivul ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
[app.js] O promisiune a fost respinsă fără a fi tratată respingerea Promise {
  <rejected> ConfigurationError: Missing required parameter: index
      at Client.existsApi [as exists] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/api/api/exists.js:38:17)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:83:47
      at Array.map (<anonymous>)
      at model.Query.clbkUsrFind (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:82:17)
      at callMiddlewareFunction (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:483:23)
      at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:194:9)
      at Kareem.execPost (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:218:3)
      at _cb (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:308:15)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/query.js:4435:12
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/helpers/query/completeMany.js:35:39
      at processTicksAndRejections (node:internal/process/task_queues:76:11)
}  având motivul ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
[app.js] O promisiune a fost respinsă fără a fi tratată respingerea Promise {
  <rejected> ConfigurationError: Missing required parameter: index
      at Client.existsApi [as exists] (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/@elastic/elasticsearch/api/api/exists.js:38:17)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:83:47
      at Array.map (<anonymous>)
      at model.Query.clbkUsrFind (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/models/user.js:82:17)
      at callMiddlewareFunction (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:483:23)
      at next (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:194:9)
      at Kareem.execPost (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:218:3)
      at _cb (/home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/kareem/index.js:308:15)
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/query.js:4435:12
      at /home/nicolaie/Desktop/DEVELOPMENT/redcolectorcolab/redcolector/node_modules/mongoose/lib/helpers/query/completeMany.js:35:39
      at processTicksAndRejections (node:internal/process/task_queues:76:11)
}  având motivul ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
[04-03-2021 14:21:37] [error] [undefined]:      [object Promise] ConfigurationError: Missing required parameter: index
Procesul a fost încheiat având codul:  1








Update-uri și probleme februarie

 Patch Update Backwards-compatible bug fixes.
 ◉ handlebars           4.7.6    ❯  4.7.7    http://www.handlebarsjs.com/
❯◯ isomorphic-git       1.8.0    ❯  1.8.1    https://isomorphic-git.org/
 ◯ mongoose             5.11.13  ❯  5.11.17  https://mongoosejs.com
 ◯ pm2                  4.5.1    ❯  4.5.4    http://pm2.keymetrics.io/
 ◯ socket.io            3.1.0    ❯  3.1.1    https://github.com/socketio/socket.io#readme
 ◯ socket.io-client     3.1.0    ❯  3.1.1    https://github.com/socketio/socket.io-client#readme
 ◯ autocannon devDep    7.0.3    ❯  7.0.4    https://github.com/mcollina/autocannon#readme
 ◯ autoprefixer devDep  10.2.3   ❯  10.2.4   https://github.com/postcss/autoprefixer#readme
  
 Minor Update New backwards-compatible features.
 ◯ @elastic/elasticsearch  7.10.0  ❯  7.11.0  http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 ◯ connect-redis           5.0.0   ❯  5.1.0   https://github.com/visionmedia/connect-redis#readme
 ◯ mocha                   8.2.1   ❯  8.3.0   https://mochajs.org/
 ◯ webpack devDep          5.18.0  ❯  5.24.0  https://github.com/webpack/webpack
 ◯ webpack-cli devDep      4.4.0   ❯  4.5.0   https://github.com/webpack/webpack-cli#readme
 
  Non-Semver Versions less than 1.0.0, caution.
❯◉ querystring  0.2.0  ❯  0.2.1  https://github.com/Gozala/querystring#readme


Update-ul la mongoose 5.11.13  ❯  5.11.17  https://mongoosejs.com introoduce: (node:19593) Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency.
Am revenit la versiunea anterioară 5.11.13. Vezi: https://github.com/Automattic/mongoose/issues/9900





Pentru că sistemul avea nevoie de managementul detașat al stării în contextul operării cu mai multe instanțe, am detașat configurări Redis-ului. Astfel, setările imuabile privind indecșii Elasticsearch au fost trecuți din process.env au în Redis. Acest lucru a fost dictat de necesitatea de a putea modifica numele indexului atunci când se face reindexare din panoul de administrare dedicat. Punctele afectate:

- /routes/controllers/resurse.ctrl.js `let idxRes = process.env.RES_IDX_ALS;` --> `redisClient.get("RES_IDX_ALS", (err, reply) => {...}` (line 24);
- /routes/administrator.js `index: process.env.RES_IDX_ES7,` și `ALS` --> (line 199, 249);
- /routes/profile.js (line 187, 233, 243, 250);
- /routes/resursepublice.js (line 20);
- /routes/sockets.js - multiple
- /models/resursa-red.js - multiple
- /models/model-helpers.resursa-red-reindex.js - multiple

Am instalat și configurat un sistem rotativ de logging al erorilor. Acesta este bazat pe winston. A fost creat un directos specific (logs) tratării datelor provenite din log-uri. Configurarea și operaționalizarea lui `winston` se face prin /util/logger.js.

Update luna ianuarie - npm-check -u
 
 Patch Update Backwards-compatible bug fixes.
❯◯ @fortawesome/fontawesome-free  5.15.1  ❯  5.15.2   https://fontawesome.com
 ◯ bufferutil                     4.0.2   ❯  4.0.3    https://github.com/websockets/bufferutil
 ◯ datatables.net-responsive      2.2.6   ❯  2.2.7    https://datatables.net
 ◯ datatables.net-responsive-dt   2.2.6   ❯  2.2.7    https://datatables.net
 ◯ globby                         11.0.1  ❯  11.0.2   https://github.com/sindresorhus/globby#readme
 ◯ holderjs                       2.9.7   ❯  2.9.9    http://holderjs.com
 ◯ mongoose                       5.11.8  ❯  5.11.13  https://mongoosejs.com
 ◯ utf-8-validate                 5.0.3   ❯  5.0.4    https://github.com/websockets/utf-8-validate
 ◯ autocannon devDep              7.0.1   ❯  7.0.3    https://github.com/mcollina/autocannon#readme
 ◯ webpack-dev-server devDep      3.11.0  ❯  3.11.2   https://github.com/webpack/webpack-dev-server#readme

 Minor Update New backwards-compatible features.
 ◯ archiver                 5.1.0   ❯  5.2.0   https://github.com/archiverjs/node-archiver
 ◯ bootstrap                4.5.3   ❯  4.6.0   https://getbootstrap.com/
❯◯ fs-extra                 9.0.1   ❯  9.1.0   https://github.com/jprichardson/node-fs-extra
 ◯ helmet                   4.3.1   ❯  4.4.1   https://helmetjs.github.io/
 ◯ passport-local-mongoose  6.0.1   ❯  6.1.0   https://github.com/saintedlama/passport-local-mongoose#readme
 ◯ socket.io                3.0.4   ❯  3.1.0   https://github.com/socketio/socket.io#readme
 ◯ socket.io-client         3.0.4   ❯  3.1.0   https://github.com/socketio/socket.io-client#readme
 ◯ supertest                6.0.1   ❯  6.1.3   https://github.com/visionmedia/supertest#readme
 ◯ autoprefixer devDep      10.1.0  ❯  10.2.3  https://github.com/postcss/autoprefixer#readme
 ◯ webpack devDep           5.11.0  ❯  5.18.0  https://github.com/webpack/webpack
 ◯ webpack-cli devDep       4.3.0   ❯  4.4.0   https://github.com/webpack/webpack-cli#readme

A fost nevoie de introducerea unui nou nivel de persistență a datelor de configurare a aplicației dincolo de ceea ce oferă din oficiu modulul .env prin setarea variabilelor de mediu.
Au fost investigate mai multe oportunități pe care următoarele module le oferă:
- conf (https://github.com/sindresorhus/conf);
- node-persist (https://www.npmjs.com/package/node-persist);
- config (https://www.npmjs.com/package/config);
- cache-conf (https://github.com/SamVerschueren/cache-conf)

Opțiunea pentru gestiunea scenariilor de dezvoltare, de test și cel de producție a găsit candidatul în pachetul config. Am explorat și posibilitatea de a constitui fișiere administrate local la nivel de read/write conform https://medium.com/@jinmatt/config-management-for-node-js-based-on-runtime-environment-variables-55b3c6d82f5c. Opțiunea realizărilor de configurări specifice rămâne deschisă pentru momentul în care aplicația va trebuie containerizată pentru realizarea maximului de portabilitate (https://zetcode.com/javascript/nodeconfig/).

USR_IDX_ES7=users0
USR_IDX_ALS=users
RES_IDX_ES7=resedus1
RES_IDX_ALS=resedus

DataTables warning: table id=DataTables_Table_0 - Requested unknown parameter 'googleProfile.name' for row 4, column 5. For more information about this error, please see http://datatables.net/tn/4 
 
 Upgrade-uri preflight ianuarie - npm-check -u:
 
 Patch Update Backwards-compatible bug fixes.
❯◯ bootstrap                     4.5.2    ❯  4.5.3    https://getbootstrap.com/
 ◯ bufferutil                    4.0.1    ❯  4.0.2    https://github.com/websockets/bufferutil
 ◯ datatables.net                1.10.21  ❯  1.10.23  https://datatables.net
 ◯ datatables.net-bs4            1.10.21  ❯  1.10.23  https://datatables.net
 ◯ datatables.net-buttons        1.6.3    ❯  1.6.5    https://datatables.net
 ◯ datatables.net-buttons-dt     1.6.3    ❯  1.6.5    https://datatables.net
 ◯ datatables.net-dt             1.10.21  ❯  1.10.23  https://datatables.net
 ◯ datatables.net-responsive     2.2.5    ❯  2.2.6    https://datatables.net
 ◯ datatables.net-responsive-dt  2.2.5    ❯  2.2.6    https://datatables.net
 ◯ fast-csv                      4.3.1    ❯  4.3.6    http://c2fo.github.com/fast-csv
 ◯ utf-8-validate                5.0.2    ❯  5.0.3    https://github.com/websockets/utf-8-validate
 ◯ uuid                          8.3.0    ❯  8.3.2    https://github.com/uuidjs/uuid#readme

 Minor Update New backwards-compatible features.
❯◯ @elastic/elasticsearch         7.9.0   ❯  7.10.0  http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
 ◯ @fortawesome/fontawesome-free  5.14.0  ❯  5.15.1  https://fontawesome.com
 ◯ isomorphic-git                 1.7.4   ❯  1.8.0   https://isomorphic-git.org/
 ◯ mocha                          8.1.1   ❯  8.2.1   https://mochajs.org/
 ◯ moment                         2.27.0  ❯  2.29.1  https://momentjs.com
 ◯ mongoose                       5.10.0  ❯  5.11.8  https://mongoosejs.com
 ◯ papaparse                      5.2.0   ❯  5.3.0   http://papaparse.com
 ◯ pm2                            4.4.1   ❯  4.5.1   http://pm2.keymetrics.io/
 ◯ validator                      13.1.1  ❯  13.5.2  https://github.com/chriso/validator.js

 Major Update Potentially breaking API changes. Use caution.
 ◯ archiver                    4.0.2   ❯  5.1.0   https://github.com/archiverjs/node-archiver
 ◯ helmet                      3.23.3  ❯  4.3.1   https://helmetjs.github.io/
 ◯ socket.io                   2.3.0   ❯  3.0.4   https://github.com/socketio/socket.io#readme
 ◯ socket.io-client            2.3.0   ❯  3.0.4   https://github.com/socketio/socket.io-client#readme
 ◯ supertest                   4.0.2   ❯  6.0.1   https://github.com/visionmedia/supertest#readme
 ◯ autocannon devDep           6.1.0   ❯  7.0.1   https://github.com/mcollina/autocannon#readme
 ◯ autoprefixer devDep         9.8.6   ❯  10.1.0  https://github.com/postcss/autoprefixer#readme
 ◯ copy-webpack-plugin devDep  6.0.3   ❯  7.0.0   https://github.com/webpack-contrib/copy-webpack-plugin
 ◯ node-sass devDep            4.14.1  ❯  5.0.0   https://github.comrăpădit în 1985, la vârsta de 54 de ani. O coincidenţă stranie face ca ziua de naştere a lui Toma Caragiu, 21 august, să fie data la care Marin Moraru a urcat la Ceruri./sass/node-sass
 ◯ postcss-cli devDep          7.1.1   ❯  8.3.1   https://github.com/postcss/postcss-cli#readme
 ◯ webpack devDep              4.44.1  ❯  5.11.0  https://github.com/webpack/webpack
 ◯ webpack-cli devDep          3.3.12  ❯  4.3.0   https://github.com/webpack/webpack-cli#readme

  Major Update Potentially breaking API changes. Use caution.
 ◯ archiver                    4.0.2   ❯  5.1.0   https://github.com/archiverjs/node-archiver
 ◯ helmet                      3.23.3  ❯  4.3.1   https://helmetjs.github.io/
 ◯ socket.io                   2.3.0   ❯  3.0.4   https://github.com/socketio/socket.io#readme
 ◯ socket.io-client            2.3.0   ❯  3.0.4   https://github.com/socketio/socket.io-client#readme
 ◯ supertest                   4.0.2   ❯  6.0.1   https://github.com/visionmedia/supertest#readme
 ◯ autocannon devDep           6.1.0   ❯  7.0.1   https://github.com/mcollina/autocannon#readme
 ◯ autoprefixer devDep         9.8.6   ❯  10.1.0  https://github.com/postcss/autoprefixer#readme
 ◯ copy-webpack-plugin devDep  6.0.3   ❯  7.0.0   https://github.com/webpack-contrib/copy-webpack-plugin
 ◯ node-sass devDep            4.14.1  ❯  5.0.0   https://github.com/sass/node-sass
 ◯ postcss-cli devDep          7.1.1   ❯  8.3.1   https://github.com/postcss/postcss-cli#readme
 ◯ webpack devDep              4.44.1  ❯  5.11.0  https://github.com/webpack/webpack
 ◯ webpack-cli devDep          3.3.12  ❯  4.3.0   https://github.com/webpack/webpack-cli#readme

Folosesc archiver la momentul în care o resursă este ștearsă și este arhivată ca zip. Singurul braking este la 5.0.2: breaking: absolute path glob patterns are no longer supported: use cwd option instead.

Migrare de la socket.io 2.23.3 la 3.0.4
Detalii de migrare aici: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/

Sunt probleme!!!
Am instalat pachetele recomandate: npm install --save-optional bufferutil utf-8-validate
De aprofundat: https://www.nginx.com/blog/nginx-nodejs-websockets-socketio/. Când va fi la serverul Nginx, o posibilă configurare ar putea fi
server {
    listen 80;
    server_name YOURDOMAIN.COM;
    client_max_body_size 100M;
    location /socket.io/ {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_pass http://localhost:PORTNUMBER/socket.io/;
    }
}

Helmet introduce un nou nivel de protecție: Content Security Policy. Pentru versiunea noă, acest nivel nu va fi implementat pentru că browserele au comportament diferit.

DataTables warning: table id=DataTables_Table_0 - 
Requested unknown parameter 'googleProfile.name' for row 3, column 5. For more information about this error, please see http://datatables.net/tn/4


Probleme de indexare

curl -X PUT "localhost:9200/resedus0/_settings?pretty" -H 'Content-Type: application/json' -d '
{
  "index.blocks.read_only_allow_delete":null
}
'

{
  "error": {
    "root_cause": [
      {
        "type": "cluster_block_exception",
        "reason": "index [resedus0] blocked by: [TOO_MANY_REQUESTS/12/index read-only / allow delete (api)];"
      }
    ],
    "type": "cluster_block_exception",
    "reason": "index [resedus0] blocked by: [TOO_MANY_REQUESTS/12/index read-only / allow delete (api)];"
  },
  "status": 429
}

[PM2][WARN] Current process list running is not in sync with saved list. app differs. Type 'pm2 save' to synchronize.
nicu@red:/var/www/red.educred.ro$ pm2 start app.js
[PM2] Starting /var/www/red.educred.ro/app.js in fork_mode (1 instance)
(node:9722) Warning: Accessing non-existent property 'cat' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:9722) Warning: Accessing non-existent property 'cd' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'chmod' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'cp' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'dirs' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'pushd' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'popd' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'echo' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'tempdir' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'pwd' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'exec' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'ls' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'find' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'grep' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'head' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'ln' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'mkdir' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'rm' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'mv' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'sed' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'set' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'sort' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'tail' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'test' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'to' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'toEnd' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'touch' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'uniq' of module exports inside circular dependency
(node:9722) Warning: Accessing non-existent property 'which' of module exports inside circular dependency
[PM2] Done.
⇆ PM2+ activated | Instance Name: red-2dfe | Dash: https://app.pm2.io/#/r/4witmxhstv3zskn
