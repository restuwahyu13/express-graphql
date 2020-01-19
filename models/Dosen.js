const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setDosenSchema = new Schema({

    nama: {

        type: String,
        required: true,
        trim: true
    },

    lulusan: {

        type: String,
        required: true,
        trim: true
    },

    gelar: {

        type: String,
        required: true,
        trim: true
    }

});


const Dosen = mongoose.model('dosen', setDosenSchema);

module.exports = Dosen;