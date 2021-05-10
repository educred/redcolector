require('dotenv').config();
global.CronJob = require('./util/cron'); // CRON -> programarea side ops-urilor

const os             = require('os');
const path           = require('path');
const devlog         = require('morgan');
const logger         = require('./util/logger');
const compression    = require('compression');
const express        = require('express');
const rateLimit      = require("express-rate-limit");
const cookies        = require('cookie-parser');
const session        = require('express-session');
const csurf          = require('csurf');
const flash          = require('connect-flash');
const redisClient    = require('./redis.config');
const helmet         = require('helmet');
const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const responseTime   = require('response-time');
const RedisStore     = require('connect-redis')(session);

const hbs            = require('express-hbs');
const app            = express();
const http           = require('http').createServer(app);

const cors           = require('cors');
const favicon        = require('serve-favicon');
const { v1: uuidv1 } = require('uuid'); // https://github.com/uuidjs/uuid#deep-requires-now-deprecated
const i18n           = require('i18n');

/* === TIMP RĂSPUNS ÎN HEADER === */
app.use(responseTime());

/* === ÎNCĂRCAREA RUTELOR NEPORTEJATE === */
let login          = require('./routes/login');
let signupLoco     = require('./routes/signup');

/* === I18N === */
i18n.configure({
    locales: ['en', 'hu', 'de', 'ua', 'pl'],
    cookie: 'locale',
    directory: __dirname + "/locales"
});

/* === MONGOOSE === */
const mongoose = require('./mongoose.config');

/* === ELASTICSEARCH env === */
const esClient = require('./elasticsearch.config');
esClient.on('sniff', (err, req) => {
    // console.log('ES7 sniff: ', err ? err.message : '', `${JSON.stringify(req.meta.sniff)}`);
    // console.log('ES7 sniff: ', err ? logger.error('La inițializarea conexiunii ES7 a apărut eroarea: ', err.message) : 'Nicio problemă detectată la inițializare!!! All norminal 👌');
});

// process.report.writeReport('./report.json');

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

/* === HELMET === */
app.use(helmet({
    contentSecurityPolicy: false
})); // .js” was blocked due to MIME type (“text/html”) mismatch (X-Content-Type-Options: nosniff)
// https://helmetjs.github.io/docs/dont-sniff-mimetype/

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

/* === PROXY SUPPORT === */
app.enable('trust proxy');

// apply to all requests
app.use('/api/', limiter);

/* === CORS === */
var corsOptions = {
    origin: '',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
if (process.env.APP_RUNTIME === 'virtual') {
    corsOptions.origin = 'http://' + process.env.DOMAIN_VIRT + ':' + process.env.PORT;
} else {
    corsOptions.origin = 'http://' + process.env.DOMAIN;
}
app.use(cors(corsOptions));

/* === BODY PARSER === */
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// introdu mesaje flash
app.use(flash()); // acum ai acces în rute la `req.flash()`.

/* === SESIUNI === */
app.use(cookies()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names

/* === INIȚIALIZARE I18N === */
app.use(i18n.init); // instanțiere modul i18n - este necesar ca înainte de a adăuga acest middleware să fie cerut cookies

// creează sesiune - https://expressjs.com/en/advanced/best-practice-security.html
let sessionMiddleware = session({
    name: process.env.APP_NAME,
    secret: process.env.COOKIE_ENCODING,
    genid: function(req) {
        return uuidv1(); // use UUIDs for session IDs
    },
    store: new RedisStore({client: redisClient}),
    unref:  true,
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
//=> FIXME: În producție, setează la secure: true pentru a funcționa doar pe HTTPS

// https://www.npmjs.com/package/express-session
if (app.get('env') === 'production') {
    app.set('trust proxy', 1);              // trust first proxy
    sessionMiddleware.cookie.secure = true; // serve secure cookies
}

// MIDDLEWARE de stabilirea a sesiunii de lucru prin încercări repetate. Vezi: https://github.com/expressjs/session/issues/99
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

/* === PASSPORT === */
app.use(passport.initialize()); // Instanțiază Passport
app.use(passport.session()); // restaurează starea sesiunii dacă aceasta există

/* === SERVER SOCKETURI === */
// #1 Creează server prin atașarea celui existent
const corsOptsSockets = {
    origin: "",
    methods: ["GET", "POST"],
    allowedHeaders: ["_csrf"],
    credentials: true
}
if (process.env.APP_RUNTIME === 'virtual') {
    corsOptsSockets.origin = 'http://' + process.env.DOMAIN_VIRT + ':' + process.env.PORT;
} else {
    corsOptsSockets.origin = 'http://' + process.env.DOMAIN;
}
const io = require('socket.io')(http, {
    cors: corsOptsSockets,
    transports: [ "websocket", "polling" ]
});
// #2 Creează un wrapper de middleware Express pentru Socket.io
function wrap (middleware) {
    return function matcher (socket, next) {
        middleware (socket.request, {}, next);
    };
}
io.use(wrap(sessionMiddleware));
// conectarea obiectului sesiune ca middleware în tratarea conexiunilor socket.io (ALTERNATIVĂ, nu șterge)
// io.use(function clbkIOuseSessions(socket, next) {
//     sessionMiddleware(socket.request, socket.request.res, next);
// });
// when a socket.io connect connects, get the session and store the id in it (https://stackoverflow.com/questions/42379952/combine-sockets-and-express-when-using-express-middleware)

/* === PASAREA SERVERULUI SOCKET === */
require('./routes/sockets')(io);

/* === RUTE ÎN AFARA CSRF-ului === */
// UPLOAD
let upload = require('./routes/upload')(io);
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

/* LOGGING CU MORGAN */
app.use(devlog('dev'));

/* === CSRF - Cross Site Request Forgery - expressjs.com/en/resources/middleware/csurf.html === */
const csurfProtection = csurf({
    cookie: {
        key: '_csrf',
        path: '/',
        httpOnly: false,
        secure: false, // dacă folosești HTTPS setează la true
        signed: false, // în caz de signed cookies, setează la true
        sameSite: 'strict', // https://www.owaspsafar.org/index.php/SameSite
        maxAge: 24 * 60 * 60 * 1000, // 24 ore
    },
    ignoreMethods: ['GET', 'HEAD', 'OPTIONS']
});

app.use(csurfProtection); // activarea protecției la CSRF
// tratează erorile apărute
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    // gestionarea erorilor CSRF token:
    res.status(403).send('Sockets.io nu trimite înapoi tokenul!!!');
});

//https://github.com/expressjs/csurf/issues/21
// app.use(function (req, res, next) {
//     if (req.url === '/repo') return next();
//     csurfProtection(req, res, next);
// })

/* === HANDLEBARS :: SETAREA MOTORULUI DE ȘABLONARE === */
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

/* === ÎNCĂRCAREA RUTELOR === */
const UserPassport = require('./routes/controllers/user.ctrl')(passport);
let index          = require('./routes/index');
let authG          = require('./routes/authGoogle/authG');
let callbackG      = require('./routes/authGoogle/callbackG');
let logout         = require('./routes/logout');
let administrator  = require('./routes/administrator');
let tertium        = require('./routes/tertium');
let resurse        = require('./routes/resurse');
let log            = require('./routes/log');
let resursepublice = require('./routes/resursepublice');
let profile        = require('./routes/profile');
let tags           = require('./routes/tags');
let help           = require('./routes/help');
let apiv1          = require('./routes/apiV1');

// === MIDDLEWARE-ul RUTELOR ===
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

// CONSTANTE
const LOGO_IMG = "img/" + process.env.LOGO;

// === 401 - NEPERMIS ===
app.get('/401', function(req, res){
    res.status(401);
    res.render('nepermis', {
        title:    "401",
        logoimg:  LOGO_IMG,
        mesaj:    "Încă nu ești autorizat pentru această zonă"
    });
});

// === 500 - Internal Server Error ===
app.get('/500', function(req, res){
    res.status(500);
    res.render('500', {
        title:    "500",
        logoimg:  LOGO_IMG,
        mesaj:    "Probleme legate de funcționare internă a serverului. Mergi la secțiunea de interes în câteva secunde."
    });
});


//=== 404 - NEGĂSIT ===
app.use('*', function (req, res, next) {
    res.render('negasit', {
        title:         "404",
        logoimg:       LOGO_IMG,
        imaginesplash: "/img/theseAreNotTheDroids.jpg",
        mesaj:         "Nu-i! Verifică linkul!"
    });
});

// colectarea erorilor de pe toate middleware-urile
app.use(function catchAllMiddleware (err, req, res, next) {
    console.error('Aplicația a crăpat cu următoarele detalii: ', err.stack);
    logger.error(err);
    res.redirect('/500');
});

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

// Afișează informații utile la start
console.info("Memoria RAM alocată la pornire este de: ", formatBytes(process.memoryUsage().rss));
if( process.env.NODE_ENV === 'production') {
    console.info("Aplicația rulează în modul", app.get("env"));
} else if (process.env.NODE_ENV === 'development') {
    console.info("Aplicația rulează în modul ", app.get("env"));
}

/* === Pornește serverul! === */
let port = process.env.PORT || 8080;
let hostname = os.hostname();
var server = http.listen(port, '0.0.0.0', function cbConnection () {
    console.log('RED Colector ', process.env.APP_VER);
    console.log(`Hostname: ${hostname}, \n port: ${process.env.PORT}. \n proces no: ${process.pid} \n`, `node: ${process.version}`);
});

/* === GESTIONAREA evenimentelor pe `process` și a SEMNALELOR === */

// gestionează erorile care ar putea aprea în async-uri netratate corespunzător sau alte promisiuni.
process.on('uncaughtException', (err) => {
    console.log('[app.js] A apărut un "uncaughtException" cu detaliile: ', err.message);
    logger.error(`${err.message} ${err.stack}`);
    // process.kill(process.pid, 'SIGTERM');
    process.nextTick( function exitProcess () {
        mongoose.disconnect(() => {
            console.log('Am închis conexiunea la MongoDb!');
        });
        process.exit(1);
    });
});

// tratarea promisiunilor respinse
process.on('unhandledRejection', (reason, promise) => {
    console.log('[app.js] O promisiune a fost respinsă fără a fi tratată respingerea', promise, ` având motivul ${reason}`);
    logger.error(`${promise} ${reason}`);
    process.nextTick( function exitProcess () {
        mongoose.disconnect(() => {
            console.log('Am închis conexiunea la MongoDb!');
        });
        process.exit(1);
    });
});

process.on('SIGINT', function onSiginit (signal) {
    mongoose.disconnect(() => {
        console.log('Am închis conexiunea la MongoDb!');
    });
    console.info(`Procesul a fost întrerupt (CTRL+C). Închid procesul ${process.pid}! Data: `, new Date().toISOString());
    process.exit(0);
});

process.on('SIGTERM', function onSiginit () {
    mongoose.disconnect(() => {
        console.log('Am închis conexiunea la MongoDb!');
    });
    console.info('Am prins un SIGTERM (stop). Închid procesul! Data: ', new Date().toISOString());
    shutdownserver();
});

process.on('exit', code => {
    console.log(`Procesul a fost încheiat având codul: `, code);
});

function shutdownserver () {
    server.close(function onServerClosed (err) {
        if (err) {
            logger.error(err.message);
            console.error(err.message, err.stack);
            process.exitCode = 1;            
        }
        process.exit(1);
    });
}



/* === LOGGER MORGAN === */
// app.use(devlog('dev', {
//     skip: function (req, res) {
//         return res.statusCode < 400;
//     }
// }));
// app.use(devlog('dev')); // Activează doar atunci când faci dezvoltare...