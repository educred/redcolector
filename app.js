require('dotenv').config();

const path           = require('path');
const logger         = require('morgan');
const compression    = require('compression');
const express        = require('express');
const bodyParser     = require('body-parser');
const cookies        = require('cookie-parser');
const session        = require('express-session');
const csurf          = require('csurf');
const redisClient    = require('./redis.config');
const helmet         = require('helmet');
const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const responseTime   = require('response-time');
// const multer         = require('multer');
const RedisStore     = require('connect-redis')(session);

const hbs            = require('express-hbs');
const app            = express();
const http           = require('http').createServer(app);

const cors           = require('cors');
const favicon        = require('serve-favicon');
const { v1: uuidv1 } = require('uuid'); // https://github.com/uuidjs/uuid#deep-requires-now-deprecated
const i18n           = require('i18n');

/* === ÎNCĂRCAREA RUTELOR === */
const UserPassport = require('./routes/controllers/user.ctrl')(passport);
let index          = require('./routes/index');
let authG          = require('./routes/authGoogle/authG');
let callbackG      = require('./routes/authGoogle/callbackG');
let login          = require('./routes/login');
let logout         = require('./routes/logout');
let administrator  = require('./routes/administrator');
let tertium        = require('./routes/tertium');
let resurse        = require('./routes/resurse');
let log            = require('./routes/log');
let resursepublice = require('./routes/resursepublice');
let profile        = require('./routes/profile');
let tags           = require('./routes/tags');
let tools          = require('./routes/tools');
let help           = require('./routes/help');
let signupLoco     = require('./routes/signup');
let apiv1          = require('./routes/apiV1');

// minimal config
i18n.configure({
    locales: ['en', 'hu', 'de', 'ua', 'pl'],
    cookie: 'locale',
    directory: __dirname + "/locales"
});

// MONGOOSE
const mongoose = require('./mongoose.config');

// LOGGER
app.use(logger('dev', {
    skip: function (req, res) {
        return res.statusCode < 400;
    }
})); // TODO: Creează un mecanism de rotire a logurilor. ('combined')
// app.use(logger('dev')); // Activează doar atunci când faci dezvoltare...

/* === FIȘIERELE statice === */
app.use(express.static(path.join(__dirname, '/public'), {
    index: false, 
    immutable: true, 
    cacheControl: true,
    maxAge: "30d"
}));
app.use('/repo', express.static(path.join(__dirname, 'repo')));
// app.use(fileUpload());
app.use(favicon(path.join(__dirname,  'public', 'favicon.ico')));

// PROTECȚIE
app.use(helmet()); // .js” was blocked due to MIME type (“text/html”) mismatch (X-Content-Type-Options: nosniff)
// https://helmetjs.github.io/docs/dont-sniff-mimetype/

// CORS
var corsOptions = {
    origin: 'http://' + process.env.DOMAIN,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// PROCESAREA CORPULUI CERERII
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// === SESIUNI ===
app.use(cookies());// Parse Cookie header and populate req.cookies with an object keyed by the cookie names

// creează sesiune - https://expressjs.com/en/advanced/best-practice-security.html
let sessionMiddleware = session({
    name: 'redcolector',
    secret: process.env.COOKIE_ENCODING,
    genid: function(req) {
        return uuidv1(); // use UUIDs for session IDs
    },
    store: new RedisStore({client: redisClient}),
    unref: true,
	proxy:  true,
    resave: false, 
    saveUninitialized: true,
    logErrors: true,
    cookie: {
        httpOnly: true,
        maxAge: (1 * 24 * 3600 * 1000),
        sameSite: 'lax' // https://www.npmjs.com/package/express-session#cookiesamesite
    }
});

// stabilirea sesiunii de lucru prin încercări repetate. Vezi: https://github.com/expressjs/session/issues/99
app.use(function (req, res, next) {
    var tries = 3; // număr de încercări
    function lookupSession (error) {
        if (error) {
            return next(error);
        }
        tries -= 1;

        if (req.session !== undefined) {
            return next();
        }

        if (tries < 0) {
            return next(new Error('Nu am putut stabili o sesiune cu Redis chiar după trei încercări'));
        }

        sessionMiddleware(req, res, lookupSession);
    }
    lookupSession();
});

// Instanțiază Passport și restaurează starea sesiunii dacă aceasta există
app.use(passport.initialize());
app.use(passport.session());

/* === RUTE ÎN AFARA CSRF-ului === */
// UPLOAD
let upload = require('./routes/upload')(pubComm);
app.use('/upload', upload);
// SIGNUP
app.use('/signup', signupLoco); // SIGNUP!!!
// LOGIN
const UserSchema = require('./models/user');
const { shutdown, server_info } = require('./redis.config');
const UserDetails = mongoose.model('users', UserSchema);

/* === PASSPORT middleware === */
passport.use(UserDetails.createStrategy()); // echivalentul lui passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());
app.use('/login', login);

/* === CSRF - Cross Site Request Forgery === */
// activarea protecției csurf - expressjs.com/en/resources/middleware/csurf.html
const csurfProtection = csurf({
    cookie: {
        key: '_csrf',
        path: '/',
        httpOnly: false,
        secure: false, // dacă folosești HTTPS setează la true
        signed: false, // în caz de signed cookies, setează la true
        sameSite: 'strict', // https://www.owaspsafar.org/index.php/SameSite
        maxAge: 24 * 60 * 60 * 1000, // 24 ore
    }
    // cookie: true
});
//https://github.com/expressjs/csurf/issues/21
// app.use(function (req, res, next) {
//     if (req.url === '/repo') return next();
//     csurfProtection(req, res, next);
// })

// Introdu în uz middleware-ul CSRF
app.use(csurfProtection); // activarea protecției la CSRF
// error handler
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    // handle CSRF token errors here
    res.status(403).send('Sockets.io nu trimite înapoi tokenul!!!');
});

// UTILIZAREA SOCKETURILOR
// when a socket.io connect connects, get the session and store the id in it (https://stackoverflow.com/questions/42379952/combine-sockets-and-express-when-using-express-middleware)
const io = require('socket.io')(http, {
    // path: '/socket.io', 
    allowUpgrades: true, 
    transports: ['polling', 'websocket'], 
    httpCompression: true,
    cookieHttpOnly: true
});
io.use(function clbkIOuseSessions(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

var pubComm = io.of('/redcol');
require('./routes/sockets')(pubComm); // injectează socket.io
require('./routes/upload')(pubComm);

// TIMP RĂSPUNS ÎN HEADER
app.use(responseTime());

// vezi http://expressjs.com/api.html#app.locals
// app.locals({
//     'PROD_MODE': 'production' === app.get('env')
// });

// SETAREA MOTORULUI DE ȘABLONARE
hbs.registerHelper('json', function clbkHbsHelperJSON (obi) {
    // console.log(JSON.stringify(obi.content));
    return JSON.stringify(obi);
});
app.engine('hbs', hbs.express4({
    i18n: i18n,
    partialsDir: __dirname + '/views/partials',
    layoutsDir:  __dirname + '/views/layouts',
    beautify: true
}));
app.set('views', __dirname + '/views'); // cu app.set se vor seta valori globale pentru aplicație
app.set('view engine', 'hbs');

// Activează protocoalele de proxy
app.set('trust proxy', true);
app.enable('trust proxy');

// INIȚIALIZARE I18N
app.use(i18n.init); // instanțiere modul i18n - este necesar ca înainte de a adăuga acest middleware să fie cerut cookies

// === COMPRESIE ===
function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }    
    // fallback to standard filter function
    return compression.filter(req, res);
}
app.use(compression({ filter: shouldCompress }));

// === MIDDLEWARE-ul RUTELOR ===
// app.use('/',               csurfProtection, index);

app.use('/api/v1',         apiv1); // accesul la prima versiune a api-ului
app.use('/auth',           authG);
app.use('/callback',       callbackG);
app.use('/logout',         logout);
app.use('/',               csurfProtection, index);
app.use('/resursepublice', csurfProtection, resursepublice);
app.use('/tertium',        csurfProtection, tertium);
app.use('/help',           csurfProtection, help);
app.use('/administrator',  csurfProtection, UserPassport.ensureAuthenticated, administrator);
app.use('/resurse',        csurfProtection, UserPassport.ensureAuthenticated, resurse);
app.use('/log',            csurfProtection, UserPassport.ensureAuthenticated, log);
app.use('/profile',        csurfProtection, profile);
app.use('/tags',           csurfProtection, tags);
app.use('/tools',          csurfProtection, tools);

// === 401 - NEPERMIS ===
app.get('/401', function(req, res){
    res.status(401);
    res.render('nepermis', {
        title:    "401",
        logoimg:  "img/red-logo-small30.png",
        mesaj:    "Încă nu ești autorizat pentru această zonă"
    });
});

//=== 404 - NEGĂSIT ===
app.use('*', function (req, res, next) {
    res.render('negasit', {
        title:    "404",
        logoimg:  "/img/red-logo-small30.png",
        imaginesplash: "/img/theseAreNotTheDroids.jpg",
        mesaj:    "Nu-i! Verifică linkul!"
    });
});

// colectarea erorilor de pe toate middleware-urile
app.use(function catchAllMiddleware (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('În lanțul de prelucrare a cererii, a apărut o eroare');
});

// gestionează erorile care ar putea aprea în async-uri netratate corespunzător sau alte promisiuni.
process.on('uncaughtException', (err) => {
    console.log('[app.js] A apărul un uncaughtException cu detaliile ', err.message);
});

// GESTIONAREA SEMNALELOR
process.on('SIGINT', function onSiginit () {
    console.info('Am prins un SIGINT (ctr+c). Închid procesul gracefull', new Date().toISOString());
    shutdownserver();
});

process.on('SIGTERM', function onSiginit () {
    console.info('Am prins un SIGTERM (stop). Închid procesul gracefull', new Date().toISOString());
    shutdownserver();
});

function shutdownserver () {
    server.close(function onServerClosed (err) {
        if (err) {
            console.error(err);
            process.exitCode = 1;
        }
        process.exit(1);
    });
}

/**
 * Funcția are rolul de a transforma numărul de bytes într-o valoare human readable
 * @param {Number} bytes 
 */
function formatBytes (bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    if (bytes == 0) {
        return "n/a";
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    if (i == 0) {
        return bytes + " " + sizes[i];
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
} 
// citește detaliile de alocare a procesului
let alocareProces = process.memoryUsage();
const detalii = {
    RAM: formatBytes(alocareProces.rss)
};

console.log("Memoria RAM alocată la pornire este de: ", detalii.RAM);

let port = process.env.PORT || 8080;
http.listen(port, '127.0.0.1', function cbConnection () {
    console.log('RED Colector ', process.env.APP_VER);
    console.log('Server pornit pe 8080 -> binded pe 127.0.0.1');
});

// exports.pubComm = pubComm;
module.exports.io = io;
