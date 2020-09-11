require('dotenv').config();
const fs           = require('fs-extra');
var BagIt          = require('bagit-fs');
const express      = require('express');
const router       = express.Router();
const {v4: uuidv4} = require('uuid');
var crypto         = require('crypto');
var mkdirp         = require('mkdirp');

// pentru a accesa variabilele setate de socket-ul care creează bag-ul.
// const sockets      = require('./sockets');

const passport     = require('passport');
// Încarcă controlerul necesar tratării rutelor de autentificare
const UserPassport = require('./controllers/user.ctrl')(passport);

/* === ÎNCĂRCAREA UNUI fișier cu `multer` === */
var multer = require('multer');

module.exports = function uploader (io) {
    // const app            = express();
    // const http           = require('http').createServer(app);
    // const io             = require('socket.io')(http);
    var pubComm = io.of('/redcol'),
        lastUuid = '';

    /* === FUNCȚII HELPER PENTRU LUCRUL CU SOCKET-URI */
    // EMIT
    function rre (nameEvt, payload) {
        pubComm.on('connect', (socket) => {
            // socket.handshake.headers
            // console.log(`socket.io connected: ${socket.id}`);
            // save socket.io socket in the session
            // console.log("session at socket.io connection:\n", socket.request.session);
            socket.request.session.socketio = socket.id;
            socket.request.session.save();
            return socket.emit(nameEvt, payload);
        });
    }

    // ON
    function rro (nameEvt, cb) {
        pubComm.on('connect', (socket) => {
            // socket.handshake.headers
            // console.log(`socket.io connected: ${socket.id}`);
            // save socket.io socket in the session
            // console.log("session at socket.io connection:\n", socket.request.session);
            socket.request.session.socketio = socket.id;
            socket.request.session.save();
            return socket.on(nameEvt, cb);
        });
    }

    /**
    * Funcția are rolul de callback pentru rro()
    * Se ascultă evenimentul `uuid`. Dacă `form01adres.msj` emite pe eveniment, înseamnă că a fost încărcată deja prima imagine și există un uuid
    * Se va seta uuid-ul local doar dacă nu are valoare.
    * În cazul în care deja este setat, se va emite către client valoarea (`form01adres.mjs`)
    */
    // function clbkOnUUID (token) {
    //     // console.log("[routes::upload.js] TOKENUL primit este ", token);
    //     lastUuid = token;
    //     if (lastUuid !== 'undefined') {
    //         rre('uuid', lastUuid);
    //     }
    // }

    /* === ASCULTĂ UUID-UL DIN CLIENT === */
    // rro('uuid', clbkOnUUID);

    // distruge fișierul dacă obiectul `destination` nu este primit
    function destroyFile(req, file, cb) {
        cb(null, '/dev/null');
    }

    // OBȚINE UN NUME DE FIȘIER ÎN CAZUL ÎN CARE CEVA S-A PETRECUT ȘI FIȘIERUL E FĂRĂ (poate o folosesc mai târziu în vreun scenariu)
    function getFilename (req, file, cb) {
        crypto.randomBytes(16, function (err, raw) {
            cb(err, err ? undefined : raw.toString('hex'));
        });
    }

    // Creează clasa Multer2Bag :: https://github.com/expressjs/multer/blob/master/StorageEngine.md
    // https://github.com/expressjs/multer/blob/6b5fff5feaf740f249b1b2858e5d06009cbd245c/storage/disk.js#L13
    function Multer2Bag (opts) {
        // console.log("Obiectul opts care intră în custom engine este ", opts);
        // this.getFilename = (opts.filename || getFilename);
        this.getFilename = opts.filename;
        this.getDestination = (opts.destination || destroyFile);
    }
    /* Your engine is responsible for storing the file and returning information on how to access the file in the future. This is done by the _handleFile function. */
    Multer2Bag.prototype._handleFile = function _handleFile (req, file, cb) {
        // extrage uuid din headers
        if (req.header('uuid')) {
            lastUuid = req.header('uuid');
        } else {
            console.error("Nu am primit uuid din header: ", req.header('uuid'));
        }
        console.log("Valorile din headers sunt: ", req.headers, " și am setat și lastUuid la valoarea ", lastUuid);

        // puntea lexicală necesară
        var that = this;
        
        that.getDestination(req, file, function clbkGetDest (err, destination) {
            console.log('[routes::upload.js::that.getDestinationa] Am să scriu fișierul în calea: ', destination);
            
            // Afișează posibile erori
            // if (err) return cb(err);
            if (err) {
                cb(err);
                return next(err);
            }

            that.getFilename(req, file, function clbkGetFilename (err, fileName) {

                console.log("[routes::upload.js::that.getDestinationa] Am filename: ", fileName);

                // Afișează posibile erori
                // if (err) return cb(err);
                if (err) {
                    cb(err);
                    return next(err);
                }

                // Extrage informația necesară BAG-ului pentru `Contact-Name`
                let contactName, profile = req.user;
                if (profile.hasOwnProperty('googleProfile')) {
                    contactName = profile.googleProfile.name;
                } else {
                    contactName = profile.username;
                }

                var bag = BagIt(destination, 'sha256', {'Contact-Name': `${contactName}`});
                // var fileName = file.originalname;
        
                // asigură originalitatea fișierelor dacă fișierele au numele și extensia generice `image.png`
                if (file.originalname === 'image.png') {
                    fileName = file.originalname + `${Date.now()}`;
                }
                
                /* The file data will be given to you as a stream (file.stream). You should pipe this data somewhere, and when you are done, call cb with some information on the file. */
                let sink = bag.createWriteStream(fileName);
                file.stream.pipe(sink);

                // https://stackoverflow.com/questions/9768444/possible-eventemitter-memory-leak-detected
                sink.on('finish', function () {
                    // trimite clientului uuid-ul creat pentru fișierul încărcat ca PRIMA RESURSĂ
                    if (!lastUuid) {
                        // dacă nu ai lastUuid, nu declanșa `uuid`
                        pubComm.emit('uuid', lastUuid);
                    }
                    /* The information you provide in the callback will be merged with multer's file object, and then presented to the user via req.files */
                    cb(null, {
                        destination: destination,
                        filename: fileName,
                        path: destination,
                        size: sink.bytesWritten
                    });
                });

                sink.on('close', () => {
                    file.stream.destroy();
                    console.log("Am încheiat scrierea stream-ului");
                });

                sink.on('error', () => {
                    file.stream.destroy();
                    return next("A apărut o eroare la scrierea stream-ului");
                });

                file.stream.on('error', () => {
                    sink.destroy();
                    return next("A apărut o eroare la scrierea stream-ului");
                });

                file.stream.on('end', () => {
                    sink.destroy();
                    console.log("Am scris cu succes stream-ul fișierului pe disc");
                });
            });
        });
    };
    
    /*
    Your engine is also responsible for removing files if an error is encountered later on. 
    Multer will decide which files to delete and when. 
    Your storage class must implement the _removeFile function. 
    It will receive the same arguments as _handleFile. 
    Invoke the callback once the file has been removed. 
    */
    Multer2Bag.prototype._removeFile = function _removeFile (req, file, cb) {
        var path = file.path;

        delete file.destination;
        delete file.filename;
        delete file.path;

        fs.unlink(file.path, cb);
    };

    // setează destinația fișierului
    function getDestination (req, file, cb) {
        // console.log("Valoarea lui lastUuid este ", lastUuid);
        
        /* === CERE CLIENTULUI UN UUID === */
        // rre('uuid', {requested: true});
        // pubComm.emit('uuid', {requested: true});

        // dacă nu ai lastUuid, înseamnă că ai de-a face cu prima resursă. Generează de aici uuid-ul
        if (lastUuid == '') {
            lastUuid = uuidv4();
            // imediat ce l-ai creat, actualizează-l și în client
            pubComm.emit('uuid', lastUuid);
        }

        let calea = `${process.env.REPO_REL_PATH}${req.user.id}/${lastUuid}/`;
        // console.log('[upload.js] calea formată în destination pe care se vor scrie fișierele este ', calea);

        /* === Directorul utilizatorului nu există. Trebuie creat !!!! === */
        if (!fs.existsSync(calea)) {
            cb(null, calea);// introdu primul fișier aici.
        } else if(fs.existsSync(calea)) {
            // păstrează spațiile fișierului original dacă acestea le avea. La întoarcere în client, va fi un path rupt de spații.
            cb(null, calea);
        }
    }

    var objConf = {
        destination: getDestination,
        filename: function giveMeFileName (req, file, cb) {
            cb(null, file.originalname);
        }        
    };

    /* === CREEAZĂ STORAGE-ul === */
    var storage = new Multer2Bag(objConf);

    // Funcție helper pentru filtrarea extensiilor acceptate
    let fileFilter = function fileFltr (req, file, cb) {
        var fileObj = {
            "image/png": ".png",
            "image/jpeg": ".jpeg",
            "image/jpg": ".jpg",
            "application/pdf": ".pdf",
            "application/msword": ".doc",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
            "application/vnd.ms-powerpoint": ".ppt",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": ".pptx",
            "application/zip": ".zip",
            "application/x-zip-compressed": ".zip",
            "multipart/x-zip": ".zip",
            "application/vnd.oasis.opendocument.text": ".odt",
            "application/vnd.oasis.opendocument.presentation": ".odp"
        };

        if (fileObj[file.mimetype] == undefined) {
            cb(new Error("Formatul de fișier nu este acceptat"), false); // nu stoca fișierul și trimite eroarea
            pubComm.emit('message', 'Formatul de fișier nu este acceptat');
        } else {
            cb(null, true); // acceptă fișierul pentru a fi stocat
        }
    };

    // crearea mecanismului de stocare pentru ca multer să știe unde să trimită
    var upload = multer({
        storage,
        fileFilter,
        limits: {
            files: 5, // permite încărcarea doar a 5 fișiere odată
            fieldSize: 50 * 1024 * 1024,
            fileSize: 50 * 1024 * 1024  // limitarea dimensiunii fișierelor la 5MB
            // fileSize: process.env.FILE_LIMIT_UPL_RES
        }        
    }); // multer() inițializează pachetul

    /* === GESTIONAREA rutei /upload === */
    router.post('/',  UserPassport.ensureAuthenticated, upload.any(), function (req, res) {        
        // console.log('Detaliile lui files: ', req.files);
        var fileP = req.files[0].path;
        var parts = fileP.split('/');
        parts.shift(); // necesar pentru a șterge punctul din start-ul căii
        var cleanPath = parts.join('/'); // reasamblează calea curată

        // var fileName = querystring.escape(req.files[0].originalname);
        var fileName = req.files[0].originalname;
        var filePath = `${process.env.BASE_URL}/${cleanPath}data/${fileName}`;
        // console.log('Calea formată înainte de a trimite înapoi: ', filePath);
        
        var resObj = {
            "success": 1,
            "file": {
                "url": `${filePath}`,
                "name": `${fileName}`
            },
            uuid: lastUuid
        };
        res.send(JSON.stringify(resObj));
    });

    return router;
};
