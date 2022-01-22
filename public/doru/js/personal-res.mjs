import {createElement, pubComm, check4url, decodeCharEntities, datasetToObject} from './main.mjs';
import {AttachesToolPlus} from './uploader.mjs';

var csrfToken = '';

if(document.getElementsByName('_csrf')[0].value) {
    csrfToken = document.getElementsByName('_csrf')[0].value;
}

// var pubComm = io('/redcol', {
//     query: {['_csrf']: csrfToken}
// });

/**
 * Funcția joacă rol de callback și va fi executată de îndată ce DOM-ul este încărcat
 * Acest lucru este necesar pentru a avea acces la dataset-ul care poartă întreaga înregistrare RED
 */
function clbkDOMContentLoaded () {

    /* === OBIECTUL RESURSA din `data-content` === */
    let data    = document.querySelector('.resursa').dataset;
    let dataRes = JSON.parse(JSON.stringify(data)) || null;
    let content = JSON.parse(dataRes.content) || null;
    let imagini = new Set(); // un `Set` cu toate imaginile care au fost introduse în document.
    let fisiere = new Set(); // un `Set` cu toate fișierele care au fost introduse în document la un moment dat (înainte de `onchange`).

    // console.log(data);

    /* === RED === */
    var resObi = {
        id:           dataRes.id, 
        contribuitor: dataRes.contribuitor,
        uuid:         content.uuid,
        content
    };

    /* === AUTORI și AUTORUL PRINCIPAL === */
    let author = '';
    if (dataRes.autori) {
        let autoriArr = resObi.autori.split(','); // tratez cazul în care ai mai mulți autori delimitați de virgule
        if (autoriArr.length >= 1) {
            author = autoriArr[0].trim();
        } else {
            author = autori;
        }
    }

    /* === resObi.nameUser === */
    resObi.nameUser = author;
    // console.log("[personal-res::profile/:id] Obiectul resursă arată astfel: ", dataRes);

    /* === resObi.versioned === */
    resObi.versioned = false;

    /**
     * Funcția are rolul de a afișa un buton *Actualizează* în cazul în care datele din RED au suferit modificări
     */
    function changed () {
        // console.log("E ceva modificat în editor");
        
        var saveBtn = new createElement('button', 'saveBtn', ['btn-sm'], {onclick: "createVersion(this)"}).creeazaElem('Actualizează');
        document.querySelector('.resursa').appendChild(saveBtn);
    }

    // TODO: Implementează un mecanism de vizualizare a commit-urilor.
    // TEST: gitgraph.js | https://gitgraphjs.com/#0 https://github.com/nicoespeon/gitgraph.js/tree/master/packages/gitgraph-js

    // TODO: Utilizatorul poate să aducă orice modificare resursei, dar dacă nu apasă pe *Actualizează*, 
    // TODO: detectează când pagina pierde focus-ul și fă un branch cu starea modificată așa cum a lăsat-o! (doar autor și administrator)
    // TODO: la revenire pe resursă i se prezintă posibilitatea de a lucra cu starea în care a lăsat resursa ultima dată
    // TODO: dacă nu revine la versiunea din master și continuă cu branch-ul, la *Actualizează*, fă `merge` pe master (doar autor și administrator)

    /* === Integrarea lui EditorJS === https://editorjs.io */
    const editorX = new EditorJS({
        placeholder: '',
        // logLevel: 'VERBOSE', 
        data: resObi.content.content,
        onReady: () => {
            console.log('Editor.js e gata de treabă!');
            //Construiește logica pentru a popula `imagini` și `fisiere` de îndată ce s-au încărcat datele
            if (resObi.content.blocks) {
                resObi.content.blocks.map(obj => {
                    switch (obj.type) {
                        case 'image':
                            imagini.add(obj.data.file.url);
                            break;
                        case 'attaches':
                            fisiere.add(obj.data.file.url);
                            break;
                    }
                });
            }
            // console.log("[editorX::onReady] În setul imagini am: ", imagini, ", iar în setul fișiere am ", fisiere);
            
            // pickCover(); // Încarcă imaginile din resursă în previzualizatorul galeriei.
        },
        holder: 'edi',   
        /* Obiectul tuturor instrumentelor pe care le oferă editorul */ 
        tools: { 
            header: {
                class: Header,
                config: {
                    placeholder: 'Introdu titlul sau subtitlul'
                }
            },
            paragraph: {
                class: Paragraph,
                inlineToolbar: true,
            },
            list: {
                class: List,
                inlineToolbar: true
            },
            table: {
                class: Table,
                inlineToolbar: true
            },
            attaches: {
                class: AttachesToolPlus,            
                config: {
                    endpoint: `${location.origin}/upload`,
                    buttonText: 'Încarcă un fișier',
                    errorMessage: 'Nu am putut încărca fișierul.'
                }
            },
            inlineCode: {
                class: InlineCode,
                shortcut: 'CMD+SHIFT+M',
            },
            embed: {
                class: Embed,
                inlineToolbar: true,
                config: {
                    services: {
                        youtube: true,
                        coub: true,
                        codepen: {
                            regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
                            embedUrl: 'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
                            html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                            height: 300,
                            width: 600,
                            id: (groups) => groups.join('/embed/')
                        }
                    }
                }
            },
            checklist: {
                class: Checklist,
                inlineToolbar: true,
            },
            image: {
                class: ImageTool,
                config: {
                    /* === providing custom uploading methods === */
                    uploader: {
                        /**
                         * ÎNCARCĂ FIȘIERUL DE PE HARD!!!
                         * @param {File} file - Fișierul încărcat ca prim parametru
                         * @return o promisiune a cărei rezolvare trebuie să fie un obiect având câmpurile specificate de API -> {Promise.<{success, file: {url}}>}
                         */
                        uploadByFile(file){  
                            //TODO: Detectează dimensiunea fișierului și dă un mesaj în cazul în care depășește anumită valoare (vezi API-ul File)
                            // console.log(file.size);

                            // => construcția obiectul care va fi trimis către server
                            let objRes = {
                                user: RED.idContributor, // este de forma "5e31bbd8f482274f3ef29103" [înainte era email-ul]
                                name: RED.nameUser, // este de forma "Nicu Constantinescu"
                                uuid: RED.uuid,  // dacă deja a fost trimisă o primă resursă, înseamnă că în `RED.uuid` avem valoare deja. Dacă nu, la prima încărcare, serverul va emite unul înapoi în client
                                resF: file,      // este chiar fișierul: lastModified: 1583135975000  name: "Sandro_Botticelli_083.jpg" size: 2245432 type: "image/jpeg"
                                numR: file.name, // name: "Sandro_Botticelli_083.jpg"
                                type: file.type, // type: "image/jpeg"
                                size: file.size
                            };

                            /**
                             * Funcția are rolul de executor pentru promisiune
                             * @param {Function} resolve callback-ul care se declanșează la rezolvarea promisiunii
                             * @param {Function} reject callback-ul declanșat la respingerea promisiunii
                             */
                            function executor (resolve, reject) {
                                // console.log('Cand încarc un fișier, trimit obiectul: ', objRes);
                                
                                // TRIMITE ÎN SERVER
                                pubComm.emit('resursa', objRes); // TRIMITE RESURSA către server. Serverul creează bag-ul și scrie primul fișier!!! [UUID creat!]

                                // RĂSPUNSUL SERVERULUI
                                pubComm.on('resursa', (respObj) => {
                                    // în cazul în care pe server nu există nicio resursă, prima va fi creată și se va primi înapoi uuid-ul directorului nou creat
                                    if (RED.uuid === '') {
                                        RED.uuid = respObj.uuid; // setează și UUID-ul în obiectul RED local
                                    }
                                    // console.log('În urma încărcării fișierului de imagine am primit de la server: ', respObj);

                                    // constituie cale relativă către imagine
                                    var urlAll = new URL(`${respObj.file}`);
                                    var path = urlAll.pathname; // de forma "/repo/5e31bbd8f482274f3ef29103/5af78e50-5ebb-11ea-9dcc-f50399016f10/data/628px-European_Union_main_map.svg.png"
                                    // obj4EditorJS.file.url = path; // introducerea url-ului nou format în obiectul de răspuns pentru Editor.js

                                    /* Editor.js se așteaptă ca acesta să fie populat după ce fișierul a fost trimis. */                            
                                    const obj4EditorJS = {
                                        success: respObj.success,
                                        file: {
                                            url: path,
                                            size: respObj.file.size
                                        }
                                    };

                                    // Adaugă imaginea încărcată în `Set`-ul `imagini`.
                                    if (!imagini.has(path)) {
                                        imagini.add(path); // încarcă url-ul imaginii în array-ul destinat ținerii evidenței acestora. Necesar alegerii copertei
                                    }

                                    // RESOLVE / REJECT
                                    resolve(obj4EditorJS); // REZOLVĂ PROMISIUNEA
                                    reject(mesaj => {
                                        pubComm.emit('mesaje', `Promisiunea așteptată de Editor.js a fost respinsă; ${mesaj}`); // CÂND EȘUEAZĂ!
                                    });
                                });
                            }
                            // construiește promisiunea
                            var promise = new Promise(executor);
                            // REZOLVĂ PROMISIUNEA!!!                     
                            return promise.then((obi) => {
                                return obi; // returnează rezultatul promisiunii. Este ceea ce are nevoie Editor.js în caz de succes
                            }).catch((error) => {
                                if (error) {
                                    pubComm.emit('mesaje', `Nu am reușit încărcarea fișierului pe server cu detaliile: ${error}`);
                                }
                            });
                        },
                        
                        /**
                         * ÎNCARCĂ CU PASTE LINK SAU DRAG-AND-DROP
                         * @param {String} url - Întreaga adresă către fișierul de imagine
                         * @return o promisiune a cărei rezolvare trebuie să fie un obiect având câmpurile specificate de API -> {Promise.<{success, file: {url}}>}
                         */
                        uploadByUrl(url){
                            //TODO: Detectează dimensiunea fișierului și dă un mesaj în cazul în care depășește anumită valoare (vezi API-ul File)
                            // console.log("[uploadByUrl] În uploadByUrl am primit următorul url drept parametru: ", url);

                            decodedURL = decodeURIComponent(url); // Dacă nu faci `decode`, mușcă pentru linkurile HTML encoded cu escape squence pentru caracterele speciale și non latine
                            let urlObj = check4url(decodedURL); // adună toate informațiile despre fișier
                            /**
                             * Funcția validează răspunsul în funcție de headere și stare
                             * @param {Object} response 
                             */
                            function validateResponse(response) {
                                if (!response.ok) {
                                    // pubComm.emit('mesaje', `Am încercat să „trag” imaginea de la URL-ul dat, dar: ${response.statusText}`);
                                    // console.log('[uploadByUrl::validateResponse] Am detectat o eroare: ', response.statusText);
                                }
                                // console.log('[uploadByUrl::validateResponse] fetch a adus: ', response); // response.body este deja un ReadableStream
                                // FIXME: Caută aici să detectezi dimensiunea iar dacă depășește o valoare, încheie aici orice operațiunea cu throw Error!!!
                                return response;
                            }

                            // ADU RESURSA
                            return fetch(decodedURL)
                                .then(validateResponse)
                                .then(response => response.blob())
                                .then(response => {
                                    // obiectul care va fi trimis către server
                                    let objRes = {
                                        user: RED.idContributor,
                                        name: RED.nameUser,
                                        uuid: RED.uuid,
                                        resF: response,                 // introdu fișierul ca blob
                                        numR: urlObj.afterLastSlash,    // completează obiectul care va fi trimis serverului cu numele fișierului
                                        type: response.type,            // completează cu extensia
                                        size: response.size             // completează cu dimensiunea 
                                    };
                                    // console.log("[uploadByUrl::fetch] În server am trimis obiectul de imagine format după fetch: ", objRes);

                                    pubComm.emit('resursa', objRes);    // trimite resursa în server (se va emite fără uuid dacă este prima)

                                    // promisiune necesară pentru a confirma resursa primită OK!
                                    const promissed = new Promise((resolve, reject) => {                                   
                                        pubComm.on('resursa', (respObj) => {
                                            // semnătura lui respObj:
                                            /*
                                                file: "http://localhost:3000/repo/5ebaf1ae32061d3fa4b7f0ae/ceb79940-8755-41e7-95fd-ee88e5e193fa/data/Marcus_Aurelius_Louvre_MR561_n02.jpg"
                                                size: 9026609                                        ​
                                                success: 1                                        ​
                                                uuid: "ceb79940-8755-41e7-95fd-ee88e5e193fa"
                                            */
                                            
                                            // obiectul necesar lui Editor.js
                                            const obj4EditorJS = {
                                                success:  respObj.success,
                                                file: {
                                                    url:  respObj.file,
                                                    size: response.size
                                                }
                                            };

                                            // console.log('[uploadByUrl::pubComm<resursa>)] UUID-ul primit prin obiectul răspuns este: ', respObj.uuid);

                                            // cazul primei trimiteri de resursă: setează UUID-ul proaspăt generat! Este cazul în care prima resursă trimisă este un fișier imagine.
                                            if (RED.uuid === '') {
                                                RED.uuid = respObj.uuid; // setează UUID-ul cu cel creat de upload-ul primei resurse
                                            }

                                            let fileLink = new URL(`${respObj.file}`);
                                            let path = fileLink.pathname; // va fi calea către fișier, fără domeniu

                                            // Adaugă imaginea încărcată în `Set`-ul `imagini`. Este necesar alegerii copertei și comparatorului pentru ștergere
                                            if (!imagini.has(path)) {imagini.add(path)};                                    

                                            resolve(obj4EditorJS); // REZOLVĂ PROMISIUNEA
                                        });
                                    });
                                    // returnează promisiunea așteptată de Editor.js
                                    return promissed.then((obi) => {                                    
                                        return obi;
                                    }).catch(error => {
                                        if (error) {
                                            console.log('Am eșuat cu următoarele detalii: ', error);
                                        }
                                    });
                                }).catch((error) => {
                                    if (error) {
                                        console.log('Am eșuat cu următoarele detalii: ', error);
                                    }
                                });
                        }
                    },
                    captionPlaceholder: 'Legendă:',
                    buttonContent: 'Selectează fișier',
                    types: 'image/*'
                }
            },
            quote: {
                class: Quote,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+O',
                config: {
                    quotePlaceholder: 'Introdu citatul',
                    captionPlaceholder: 'Autorul citatului',
                }
            }
        },
        i18n: {
            messages: {
                // traducerea diferitelor componente ale UI-ului
                ui: {
                    "blockTunes": {
                        "toggler": {
                            "Click to tune": "Apasă pentru a modifica",
                            "or drag to move": "sau trage pentru a muta"
                        },
                    },                
                    "toolbar": {
                        "toolbox": {
                            "Add": "Adaugă"
                        }
                    }
                },
                toolNames: {
                    "Text": "Paragraf",
                    "Attaches": "Încarcă fișiere",
                    "Heading": "Subtitluri",
                    "List": "Listă",
                    "Warning": "Avertizare",
                    "Checklist": "Checklist",
                    "Quote": "Citat",
                    "Code": "Cod",
                    "Delimiter": "Delimitare",
                    "Raw HTML": "HTML pur",
                    "Table": "Tabel",
                    "Link": "Link",
                    "Marker": "Marker",
                    "Bold": "Bold",
                    "Italic": "Italic",
                    "InlineCode": "Cod inclus",
                },
                /**
                 * Section allows to translate Block Tunes
                 */
                blockTunes: {
                    /**
                     * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
                     * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
                     *
                     * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
                     */
                    "delete": {
                        "Delete": "Șterge blocul"
                    },
                    "moveUp": {
                        "Move up": "Mută mai sus"
                    },
                    "moveDown": {
                        "Move down": "Mută mai jos"
                    }
                }      
            }
        },    
        onChange: () => {
            // TODO: Dacă s-a modificat, apare un buton *Actualizează*
            if (resObi.versioned === false) {
                resObi.versioned = true;
                // console.log('Era false, acum este ', RED.versioned);
                changed(); // adaugă butonul *Actualizează*
            }

            editorX.save().then((content) => {
                // verifică dacă proprietatea `content` este populată.
                if (!('content' in resObi)) {
                    resObi.content = content; // Dacă nu există introduc `content` drept valoare.
                } else if (typeof(resObi.content) === 'object') {
                    resObi.content = null; // Dacă există deja, mai întâi setează `content` la `null` 
                    resObi.content = content; // și apoi introdu noua valoare.
                    
                    // console.log("[onChange::RED.content] are următorul conținut: ", resObi.content);

                    // === Logică de ștergere de pe HDD a imaginilor care au fost șterse din editor ===
                    // Pas 1 Constituie un array cu imaginile care au rămas după ultimul `onchange`
                    const imgsInEditor = resObi.content.blocks.map((element) => {
                        if (element.type === 'image') {
                            // console.log("[onChange::RED.content.blocks.map((element)] url-ul pentru imagine a elementelor `image`: ", element.data.file.url);
                            let urlImg = check4url (element.data.file.url);
                            if (urlImg) {
                                return urlImg.path2file;
                            } else {
                                return;
                            }
                        }
                    });

                    // console.log("[onChange::imgsInEditor] Imaginile care au rămas în editor după ultima modificare în array-ul `imgsInEditor`: ", imgsInEditor);
                    
                    // Pas 2 Șterge fișierele care nu mai sunt prezente după `onchange`. Transformi `Set`-ul `imagini` al tuturor imaginilor încărcate într-un array
                    // Îl parcurgi căutând dacă linkul din `imagini` este prezent și în `imgsInEditor` al imaginilor rămase după ultima modificare.
                    Array.from(imagini).map((path) => {
                        if (!imgsInEditor.includes(path)){
                            // dacă o cale din imagini` nu mai există în `imgsInEditor`, va trimite un eveniment de ștergere
                            imagini.delete(path); // mai întâi șterge link-ul din `imagini`
                            // extrage numele fișierului din `fileUrl`
                            let fileName = path.split('/').pop();
                            // console.log("[onChange::imgsInEditor] Voi șterge din subdirectorul resursei următorul fișier: ", fileName);
                            
                            // emite un eveniment de ștergere a fișierului din subdirectorul resursei.                            
                            // pubComm.emit('delfile', {
                            //     uuid: resObi.uuid,
                            //     idContributor: resObi.idContributor,
                            //     fileName: fileName
                            // });
                            pubComm.on('delfile', (message) => {
                                // console.log("Am șters cu următoarele detalii: ", message);
                            });
                        }
                    });                

                    // === Logică de ștergere de pe HDD a fișierelor care nu mai există în client
                    // Pas 1 Adaugă la căile existente în `fișiere` ulimele fișierele adăugate după ultimul `onchange`
                    const filesInEditor = resObi.content.blocks.map((element) => {
                        if (element.type === 'attaches') {
                            let path = '';
                            // dacă stringul din elementele image ale lui content.blocks sunt chiar full url-uri cu tot `base`.
                            let detailsUrl = check4url (element.data.file.url);
                            path = detailsUrl.path2file;

                            // console.log("[atașamente] Am extras următoarea cale a documentului din url: ", path);
                            fisiere.add(path); // adaugă calea în fișiere. Dacă există deja, nu va fi adăugat.
                            return path;
                        }
                    });
                    
                    // Fă verificările dacă cel puțin un document a fost adăugat
                    if(fisiere.size > 0) {
                        let FtoDelete = Array.from(fisiere).map((path) => {
                            // Caută în setul fișierelor după ultima modificare
                            if (!filesInEditor.includes(path)){
                                return path;
                            }
                        });
                        if (FtoDelete.length > 0) {                    
                            FtoDelete.forEach(function clbk4Eac2Del (path) {
                                if (path) {
                                    fisiere.delete(path);
                                    // extrage numele fișierului din `fileUrl`
                                    let fileName = path.split('/').pop();
                                    
                                    // emite un eveniment de ștergere a fișierului din subdirectorul resursei                                
                                    // pubComm.emit('delfile', {
                                    //     uuid: resObi.uuid,
                                    //     idContributor: resObi.idContributor,
                                    //     fileName: fileName
                                    // });
                                    pubComm.on('delfile', (messagge) => {
                                        // console.log("Am șters cu următoarele detalii ", messagge);
                                    });
                                }
                            });
                        }
                    }
                }
                // tratează cazul în care userul este validator
                if (insertGal) pickCover(); // formează galeria pentru ca utilizatorul să poată selecta o imagine
            }).catch((e) => {
                console.log(e);
            });
        }
    });

    /**
     * Funcția șterge înregistrările din MongoDB și din Elasticsearch, precum și de pe discul serverului
     */
    function deleteRes () {
        pubComm.emit('delresid', resObi);
        // console.log('Am trimis obiectul::content: ', resObi);
        pubComm.on('delresid', (res) => {
            alert("Am șters: ", res.title);
            if (res) {
                // window.location = '/profile/' + dataRes.id;
                window.location = '/profile/resurse';
            }
        });
    }
    globalThis.deleteRes = deleteRes;

    var resursa          = document.getElementById(resObi.id);
    var validateCheckbox = document.getElementById('valid');
    var publicCheckbox   = document.getElementById('public');
    validateCheckbox.addEventListener('click', validateResource);

    // tratează cazul în care este doar validator
    if (publicCheckbox) publicCheckbox.addEventListener('click', setGeneralPublic);

    // setează clasele în funcție de starea resursei
    if (validateCheckbox.checked) {
        resursa.classList.add('validred');
    } else {
        resursa.classList.add('invalidred');
    }

    /**
     * Funcția are rolul de listener pentru input checkbox-ul pentru validare
     * Modifică documentul în bază, declarându-l valid
     * Input checkbox-ul se formează din rute routes.js la app.get('/profile/resurse/:idres'...
     * @param {Object} evt 
     */
    function validateResource (evt) {
        var queryObj = {_id: dataRes.id};
        // se va trimite valoarea true sau false, depinde ce valoarea are checkbox-ul la bifare sau debifare
        if (validateCheckbox.checked) {
            // verifică dacă există clasa 'invalidred' (resursa pornește nevalidată)
            if (resursa.classList.contains('invalidred')) {
                resursa.classList.replace('invalidred', 'validred');
            }
            queryObj.expertCheck = true;
            pubComm.emit('validateRes', queryObj);
        } else {
            if (resursa.classList.contains('validred')) {
                resursa.classList.replace('validred', 'invalidred');
            }
            queryObj.expertCheck = false;        
            pubComm.emit('validateRes', queryObj);
        }
        pubComm.on('validateRes', (response) => {
            // TODO: modifică backgroundul galben în verde pal
            if (response.expertCheck) {
                console.log('Schimb culoarea background-ului din galben în verde pal');
            } else {
                console.log('Schimb culoarea background-ului din verde pal în galben');
            }
        });
    };

    /**
     * Funcția are rolul de a seta o resursă ca fiind disponibilă publicului
     * @param {Object} evt 
     */
    function setGeneralPublic (evt) {
        var queryObj = {_id: dataRes.id};
        // se va trimite valoarea true sau false, depinde ce valoarea are checkbox-ul la bifare sau debifare
        if (publicCheckbox.checked) {
            queryObj.generalPublic = true;
            pubComm.emit('setPubRes', queryObj);
        } else {
            queryObj.generalPublic = false;        
            pubComm.emit('setPubRes', queryObj);
        }    
        pubComm.on('setPubRes', (response) => {
            // TODO: modifică backgroundul galben în verde pal
            if (response.generalPublic) {
                console.log('Resursa a intrat în zona publică');
            } else {
                console.log('Resursa a fost retrasă din zona publică');
            }
        });
    };

    // Obține informație despre repo-ul git.
    let infobtn = document.getElementById('infoload');
    infobtn.addEventListener('click', (evt) => {
        // console.log(`[personal-res.mjs] Am să aduc informație despre repo`, resObi.contribuitor, content.emailContrib);
        let obi = {path: `${resObi.contribuitor}/${resObi.uuid}`, name: content.autori, email: content.emailContrib, message: ''};
        pubComm.emit('gitstat', obi);
    });

    // descarcă resursa ca zip
    let zipdownloadbtn = document.getElementById('zipdownload');
    zipdownloadbtn.addEventListener('click', (evt) => {
        fetch(`${document.location.origin}${document.location.pathname}/zip?` + new URLSearchParams({
            path: `${resObi.contribuitor}/${resObi.uuid}`,
            uuid: `${resObi.uuid}`
        }).toString()).then((response) => {
            if (response.status != 200) {
                throw new Error("Bad Server Response"); 
            } else {
                downloadFile(response);
            }
          }).catch((error) => {
            console.log(error);
        });
        
        console.log(`[personal-res.mjs] Mă duc să pregătesc zip-ul`);
    });

    let saveversionbtn = document.getElementById('saveversion');
    saveversionbtn.addEventListener('click', (evt) => {
        console.log(`[personal-res.mjs] Voi salva această versiune`);
    });

    // Procesarea răspunsului privind starea repo-ului de git
    pubComm.on('gitstat', (data) => {
        console.log(`Repo-ul de git are următoarele date `, data);

        /*
            GITGRAPH
        */
        // Get the graph container HTML element.

        const graphContainer = document.getElementById("graph-container");

        if (GitgraphJS !== null) {
            graphContainer.innerHTML = '';

            // Instantiate the graph.
            const gitgraph = GitgraphJS.createGitgraph(graphContainer, {
                orientation: 'vertical-reverse',
                template: GitgraphJS.templateExtend('metro', {
                    colors: ['red', 'blue', 'orange']
                })
            }); // https://www.nicoespeon.com/gitgraph.js/#14
            // https://www.nicoespeon.com/gitgraph.js/stories/?path=//story/gitgraph-js-1-basic-usage--default
            
            const master = gitgraph.branch("master", {
                style: {
                    label: {
                        color: 'green',
                        font: 'italic 10pt serif'
                    }
                }
            });
            let commitpiece;
            for (commitpiece of data) {
                master.commit({
                    subject: commitpiece.message,
                    author: commitpiece.authorName,
                    dotText: '🙀',
                    style: {
                        message: {
                            displayAuthor: true,
                            displayBranch: true,
                            displayHash:   false,
                            font: "normal 10pt Arial",
                            color: 'green'
                        }
                    },
                    // onClick: alert('Bau')
                });
            }
            // https://www.nicoespeon.com/gitgraph.js/stories/?path=/story/gitgraph-js-3-events--on-commit-dot-click
        }
    });

    /**
     * Funcția are rolul de a face vizibil selectorul de arii
     */
    function showArii() {
        let ariiSelector = document.querySelector('#arii-curr');
        if (ariiSelector.hidden) {
            ariiSelector.hidden = false;
        } else {
            ariiSelector.hidden = true;
        }
        // Verifică care arii există deja si pune-le atributul selected în multi selectul care va apărea.
        //# 1 constituie un array al ariilor deja existente
    };

    function showCompDig() {
        let compdig = document.querySelector('#compdig');
        if (compdig.hidden) {
            compdig.hidden = false;
        } else {
            compdig.hidden = true;
        }
    };

    function adaugArie() {
        // Verifică mai întâi dacă nu cumva aria deja există între elementele grafice.
    };

    // Afișează selectorul de imagini - https://codepen.io/kskhr/pen/pRwKjg
    /**
     * Funcția este receptor pentru containerele imaginilor timbru
     * Funcția are rolul de a bifa și debifa imaginile din galeria celor expuse selecției.
     */
    function clickImgGal () {
        // selectează toate elementele care au clasa `.image-checkbox`
        let elementContainer = document.querySelectorAll('.image-checkbox'); // e o HTMLColection de div-uri care conțin fiecare următorii copii: img, input, svg
        // caută între cei trei copii elementul <input>
        elementContainer.forEach( liveNode => {
            // caută primul element <input type="checkbox">, care este în mod normal și primul care are atributul `checked`
            let inputCollection = liveNode.querySelectorAll('input[type=checkbox]');
            inputCollection.forEach(element => {
                // adaugă-i acestui element clasa `image-checkbox-checked`
                if (element.checked) {
                    element.classList.add('image-checkbox-checked');
                } else {
                    // altfel, sterge-i clasa `image-checkbox-checked`
                    element.classList.remove('image-checkbox-checked');
                }
            });
        });

        this.classList.toggle('image-checkbox-checked');
        var checkbox = this.querySelector('input[type=checkbox]');

        if(checkbox.checked === false) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }

        if (checkbox.checked === true) {
            this.querySelector('svg').classList.add('d-block');
        } else {
            this.querySelector('svg').classList.add('d-none');
        }

        if(checkbox.checked === true){
            this.querySelector('svg').classList.remove('d-none');
            this.querySelector('svg').classList.toggle('d-block');
        }
    };

    var insertGal = document.getElementById('imgSelector');
    /**
     * Funcția generează toate elementele ce poartă imagini pentru a putea fi bifată cea care devine coperta resursei.
     */
    function pickCover () {
        insertGal.innerHTML = '';
        for (let img of imagini) {
            // console.log('imaginea selectată pentru copertă este: ', img);
            
            let container = new createElement('div', '', [`col-xs-4`, `col-sm-3`, `col-md-2`, `nopad`, `text-center`], null).creeazaElem();
            container.addEventListener('click', clickImgGal);
            let imgCheck = new createElement('div', '', [`image-checkbox`], null).creeazaElem();
            //FIXME: trebuie doar căi relative!!!! Repară stringurile care sunt culese în `imagini`.
            
            let imgElem = new createElement('img', '', [`img-responsive`], {src: `${img}`}).creeazaElem();
            let inputElem = new createElement('input', '', [`inputCheckGal`], {type: 'checkbox', value: `${img}`}).creeazaElem();
            let inputI = new createElement('i', '', [`fa`, 'fa-check', 'd-none'], null).creeazaElem();

            imgCheck.appendChild(imgElem);
            imgCheck.appendChild(inputElem);
            imgCheck.appendChild(inputI);
            container.appendChild(imgCheck);
            insertGal.appendChild(container);
        }
        return insertGal;
    };
}

document.addEventListener("DOMContentLoaded", clbkDOMContentLoaded);


