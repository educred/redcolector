const mongoose = require('mongoose');

let MDAG = new mongoose.Schema({
    hash: String,
    algo: String,
    name: String,
    uri: String,
    definition: [{lang: String, def: String}],
    label: [{lang: String, name: String}]
});

module.exports = new mongoose.model('mdag', MDAG);