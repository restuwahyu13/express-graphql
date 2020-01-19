const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setSkripsiSchema = new Schema({

    judul: {

        unique: true,
        type: String,
        required: true,
        trim: true
    },

    programming: {

        type: String,
        required: true,
        trim: true,
    },

    type: {

        type: String,
        required: true,
        trim: true
    }
});

const Skripsi = mongoose.model('skripsi', setSkripsiSchema);

module.exports = Skripsi;