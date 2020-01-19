const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const setMahasiswaSchema = new Schema({

    nama: {

        type: String,
        required: true,
        trim: true
    },
    npm: {

        unique: true,
        type: Number,
        required: true,
        trim: true
    },
    fak: {

        type: String,
        required: true,
        trim: true
    },
    ta: {

        type: Schema.Types.ObjectId,
        unique: true,
        required: true,
        trim: true,
        ref: 'skripsi'
    },
    dp: {

        type: Schema.Types.ObjectId,
        unique: true,
        required: true,
        trim: true,
        ref: 'dosen'
    }
});

const Mahasiswa = mongoose.model('mahasiswa', setMahasiswaSchema);

module.exports = Mahasiswa;