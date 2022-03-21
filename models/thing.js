const mongoose = require('mongoose');
const { Schema } = mongoose;

// https://omeka.org/classic/docs/Content/Working_with_Dublin_Core/
// https://www.digitalnc.org/partners/describing-your-materials/
// https://www.dublincore.org/specifications/dublin-core/dcmi-terms/
// https://www.dublincore.org/specifications/dublin-core/dces/
// https://github.com/structureddynamics/Bibliographic-Ontology-BIBO

let Thing = new mongoose.Schema({
    title: {
        type: String // http://purl.org/dc/elements/1.1/title
    }
});

module.exports = Thing;