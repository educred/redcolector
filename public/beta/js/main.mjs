var csrfToken = '',
    socket    = null,
    pubComm   = null;

globalThis.socket = socket;
globalThis.pubComm = pubComm;

// var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

if (document.getElementsByName('_csrf')[0].value) {
    csrfToken = document.getElementsByName('_csrf')[0].value;
    socket = io({
        query: {
            ['_csrf']: csrfToken
        },
        transports: [ "websocket", "polling" ]
    });

    // socket.on("connect", (data) => {
    //     console.log(socket.id);
    // });

    pubComm = io('/redcol', {
        withCredentials: true,
        extraHeaders: {
            "_csrf": csrfToken
        },
        query: {
            ['_csrf']: csrfToken
        },
        transports: [ "websocket", "polling" ]
    });
}

// === MANAGEMENTUL COMUNICĂRII pe socketuri ===
// pubComm.on('mesaje', (mess) => {
//     // TODO: execută funcție care afișează mesajul

//     $.toast({
//         heading: 'Colectorul spune:',
//         text: `${mess}`,
//         position: 'top-center',
//         showHideTransition: 'fade',
//         hideAfter : 7000,
//         icon: 'info'
//     });
//     //https://kamranahmed.info/toast
// });

/**
 * Clasa `createElement` va creea elemente HTML
 * @param {string} tag este un șir de caractere care indică ce tip de element va fi creat
 * @param {string} [id] este un șir de caractere care indică un id pentru element
 * @param {Array}  [cls] este un array ce cuprinde clasele elementului
 * @param {Object} [attrs] este un obiect de configurare a elementului care permite definirea de atribute
 */
class createElement {
    constructor(tag, id, cls, attrs){
        this.id = id;
        this.tag = tag;
        this.classes = [...cls];
        this.attributes = attrs;    // va fi un un obiect de configurare, fiecare membru fiind un posibil atribut.
    }
    /**
     * Metoda `creeazaElem()` generează obiectul DOM
     * @param {String} textContent Este conținutul de text al elementului, dacă acest lucru este necesar
     * @param {Boolean} requiredElem Specifică dacă un element are atributul `required`
     */
    creeazaElem (textContent, requiredElem) {
        const element = document.createElement(this.tag);
        if (this.id) element.id = this.id;
        if (this.classes) element.classList.add(...this.classes);
        if (this.attributes) {
            for (let [key, val] of Object.entries(this.attributes)) {
                element.setAttribute(key, val);
            }
        }
        // if (textContent) element.textContent = textContent;
        if (textContent) {
            var text = '' + textContent;
            let encodedStr = decodeCharEntities(text); // decodifică entitățile 
            let txtN = document.createTextNode(encodedStr);
            element.appendChild(txtN);
        }
        if (requiredElem) element.required = true;
        return element;
    }
}

/**
 * Convertește un characterSet html în caracterul original.
 * @param {String} str htmlSet entities
 **/
function decodeCharEntities (str) {
    let decomposedStr = str.split(' ');
    //+ FIXME: Nu acoperă toate posibilele cazuri!!! ar trebui revizuit la un moment dat.
    var entity = /&(?:#x[a-f0-9]+|#[0-9]+|[a-z0-9]+);?/igu;
    
    let arrNew = decomposedStr.map(function (word, index, arr) {
        let newArr = [];
        if (word.match(entity)) {
            let fragment = [...word.match(entity)];

            for (let ent of fragment) {
                var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
                var translate = {
                    "nbsp" : " ",
                    "amp"  : "&",
                    "quot" : "\"",
                    "apos" : "\'",
                    "cent" : "¢",
                    "pound": "£",
                    "yen"  : "¥",
                    "euro" : "€",
                    "copy" : "©",
                    "reg"  : "®",
                    "lt"   : "<",
                    "gt"   : ">"
                };
                return ent.replace(translate_re, function (match, entity) {
                    return translate[entity];
                }).replace(/&#(\d+);/gi, function (match, numStr) {
                    var num = parseInt(numStr, 10);
                    return String.fromCharCode(num);
                });
            }
            return arrNew;
        } else {
            newArr.push(word);
        }
        return newArr.join('');
    });
    return arrNew.join(' ');
}

/**
 * Funcția `encodeHTMLentities()` convertește un string în entități html.
 * @param {String} str Este un string de cod HTML care nu este escaped
 */
function encodeHTMLentities (str) {
    var buf = [];			
    for (var i = str.length-1; i >= 0; i--) {
        buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }    
    return buf.join('');
}

/**
 * Funcția are rolul de a extrage setul de date atașat unui element prin data-*
 * @param {Object} elem 
 */
function datasetToObject(elem){
    var data = {};
    [].forEach.call(elem.attributes, function(attr) {
        if (/^data-/.test(attr.name)) {
            var camelCaseName = attr.name.substr(5).replace(/-(.)/g, function ($0, $1) {
                return $1.toUpperCase();
            });
            data[camelCaseName] = attr.value;
        }
    });
    return data;
}

/**
 * Funcția are rolul de a oferi calea către un fișier, numele fișierului și un obiect URL, dacă stringul este detectat a fi un URL.
 * Funcția face wrapping peste API-ul `URL`, fiind cel care oferă obiectul `uri` ca membru al obiectului returnat. 
 * În cazul în care ai o cale, în `afterLastSlash` ai numele fișierului; în cazul URL-urilor vei avea ultimul segment din cale
 * În cazul URL-urilor, numele fișierului îl poți extrage din obiectul `uri.pathname` sau din `afterLastSlash`.
 * Atenție, `path2file` oferă calea completă către fișier fără domeniu și fără protocol.
 * În cazul căilor care nu au un fișier, `path2file` va avea aceeași valoare precum `path`.
 * @param {String} url Poate fi un URL întreg sau poate fi o cale
 * @returns {Object} Obiectul are semnătura `{err, path, path2file, afterLastSlash, uri}`
 */
function check4url (url) {
    url = decodeURI(url); // facem decode, să nu avem surprize

    let err, uri;
    let path = '';
    let path2file = '';

    // extrage indexul la care apare pentru prima dată slash-ul
    let idx4first = url.indexOf('/');
    let lastidx   = url.lastIndexOf('/');
    let protoP    = url.substr(0, idx4first); // extrage posibilul protocol
    let trail     = url.substr(lastidx); // file sau query string sau fragment locator
    // Verifică dacă ceea ce este după ultimul slash este un fișier
    let fileDetector = new RegExp('(^[aA-zZ]\d\/)?([;&aA-zZ\d%_.~+=-]*\.[aA-zZ]?)\w+$','g');

    // dacă indexul primei apariții este poziția 0 sau 1 înseamnă că avem de-a face cu o cale relativă (`/`, `./`)
    switch (idx4first) {
        case 0:
            path = url.substr(idx4first, lastidx);
            path2file = path + trail;
            break;
        case 1:
            path = url.substr(idx4first, lastidx);
            path2file = path + trail;
            break;
        case 5:
            // http:/ -> Este cazul în care chiar avem de-a face cu un URL
            let regP = new RegExp('^(http?:\/\/)?', 'g');   // șablon căutare
            if (regP.test(protoP)) {
                uri =  new URL(url);
                path = uri.pathname.substr(0, uri.pathname.lastIndexOf('/'));
                // testează dacă după ultimul slash este un fișier; Dacă este un fișier/domeniu/query/fragment, scrie path ca mai sus, dar dacă nu, ține path ca uri.pathname
                if (fileDetector.test(trail)) {
                    let arrMatched = fileDetector.exec(trail);
                    afterLastSlash = arrMatched[0];
                }
                path2file = uri.pathname;
            } else {
                err = new Error('În locul protocolului http am primit ceva neobișnuit!');
            }
        case 6:
            // https:/
            let regPS = new RegExp('^(https?:\/\/)?', 'g');
            if (regPS.test(protoP)) {
                uri =  new URL(url);
                path = uri.pathname.substr(0, uri.pathname.lastIndexOf('/'));
                // testează dacă după ultimul slash este un fișier; Dacă este un fișier/domeniu/query/fragment, scrie path ca mai sus, dar dacă nu, ține path ca uri.pathname
                if (fileDetector.test(trail)) {
                    let arrMatched = fileDetector.exec(trail);
                    afterLastSlash = arrMatched[0];
                }
                path2file = uri.pathname;
            } else {
                err = new Error('În locul protocolului https am primit ceva neobișnuit!');
            }
        default:
            break;
    }

    return {
        err,
        path,
        path2file,
        afterLastSlash: trail.substr(1),
        uri
    };
}

/*
* MECANISM DE EXPIRAREA A CHEILOR DIN LOCALSTORAGE
* https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
*/

/**
 * Setează o cheie în `localStorage`
 * @param key nume cheie
 * @param value valoarea care trebuie stocată
 * @param ttl valoarea în milisecunde
 */
function setWithExpiry(key, value, ttl) {
    // creează un obiect `Date`
	const now = new Date();

	// obiectul `item` este un obiect pe care îl vom serializa
	const item = {
		value,
		expiry: now.getTime() + ttl,
	};

    // și apoi îl introducem în `localStorage`
	localStorage.setItem(key, JSON.stringify(item)); 
    // trebuie convertite la string pentru că atât putem stoca în localstorage
}

/**
 * Funcția are rolul de a lua o valoare din `localStore`, a vedea dacă este expirată,
 * Dacă timpul a expirat, și nu există valoare în parametrul `exp` o șterge.
 * Dacă există valoare în parametrul `exp`, timpul va fi prelungit cu valoarea primită
 * @param key numele cheii din `localStore`
 * @param exp este valoarea în milisecunde a timpului cu care își extinde durata de viață cheia
 * @returns valoarea cheii
 */
function getWithExpiry(key, exp) {
	const itemStr = localStorage.getItem(key);

	// dacă valoarea nu există, returnează `null`.
	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date(); // creează obiectul `Date`

	// compară timpul de expirare a elementului cu timpul curent
	if (now.getTime() > item.expiry && !exp) {
		// Dacă timpul curent este mai mare decât cel din obiect, șterge elementul din storage
		localStorage.removeItem(key);
		return null; // și returnează valoarea `null`
	} else {
        let preexisting = parseInt(item.expiry),
            addedtime = parseInt(exp);
        item.expiry = preexisting += addedtime;
        // actualizează valoarea cheii
        localStorage.setItem(key, JSON.stringify(item));
    }
	return item.value; // Dacă este în timpul setat, returnează valoarea
}

// let ocalecufis = '/test/ceva/ceva.jpg';
// let ocale      = '/test/ceva/';
// let unurl      = 'http://www.ceva.ro/cale1/cale2';
// let unurlS     = 'https://www.ceva.ro/cale1/cale2';
// let unurlfis   = 'http://www.ceva.ro/cale1/cale2/imagine.jpg';
// let unurlfisS  = 'https://www.ceva.ro/cale1/cale2/imagine.jpg';
// let real01     = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Moscow%2C_Russia.svg/800px-Flag_of_Moscow%2C_Russia.svg.png';
// let real02     = 'https://en.wikipedia.org/wiki/File:Flag_of_Moscow,_Russia.svg'

// check4url(ocalecufis); //?
// check4url(ocale);      //?
// check4url(unurl);      //?
// check4url(unurlS);     //?
// check4url(unurlfis);   //?
// check4url(unurlfisS);  //?
// check4url(real01);     //?
// check4url(real02);     //?

export {socket, pubComm, setWithExpiry, getWithExpiry, check4url, createElement, decodeCharEntities, datasetToObject};