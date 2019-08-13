'use strict'
const mongoose = require('../config/database');
const schema   = mongoose.Schema;

const jogosModel = new schema({
    nome:        { type: String, required: true, trim: true },
    dificuldade: { type: String, required: true, trim: true },
    criado_aos:  { type: Date, default: Date.now }
},{ 
    versionKey: false 
});

jogosModel.pre('save', (next) => {
    let agora = new Date();
    if (!this.dataCriacao)
        this.dataCriacao = agora;
    next();
});

jogosModel.index({ nome: 1 });

module.exports = mongoose.model('Jogos', jogosModel);