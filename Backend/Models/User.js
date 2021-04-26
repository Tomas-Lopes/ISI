const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    apelido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    nif: {
        type: Number,
        required: true
    },
    numTel: {
        type: Number,
        required: true 
    },
    morada: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model("Users", userSchema);