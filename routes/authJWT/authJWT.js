/* === DEPENDINȚE === */
const path        = require('path');
const mongoose    = require('mongoose');
const UserSchema  = require('../../models/user'); // adu schema
const UserModel   = mongoose.model('users', UserSchema); // constituie modelul
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const publicKey   = path.join(__dirname, '../../assets/ssl_keys/', 'id_rsa_pub.pem');
const PUB_KEY     = fs.readFileSync(publicKey, 'utf8');

// Tokenul trebuie să vină ca Authorization: Bearer Tokenuli_alfanumeric

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256'],
};

// definirea strategiei
const JWTstrategy = new JwtStrategy(options, (payload, done) => {
    // Strategia `JwtStrategy` va lua tokenul primit în header, îl va valida folosind jsonwebtoken și va pasa `payload` în callback
    // nu uita, la momentul în care se creează JWT-ul, va fi inclus în payload id-ul userului luat din MongoDB
    UserModel.findOne({_id: payload.sub}).then((user) => {
        if (user) {
            return done(null, user); // nu este eroare, returnează user-ul
        } else {
            return done(null, false); // nu există eroare, dar nu ai nici user
        }
    }).catch(err => done(err, null));    
});

// pentru toate rutele protejate, va trebui să imporți strategia și să pui drept middleware de verificare: 
// router.get('/protejata', passport('jwt', {session: false}), (req, res, next) => {});

module.exports = (passport) => {
    passport.use(JWTstrategy);
};
