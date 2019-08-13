'use strict';
const express = require('express');
const router  = express.Router();
const JogoMod = require('../models/jogo-model');
const moment  = require('moment');

moment.locale('pt');

router.get('/', (req, res) => {
    res.render('pages/index');
});

router.get('/feed', (req, res) => {
    JogoMod.find({}).sort({criado_aos: -1}).limit(20).then((data) => {
        res.render('pages/feed',{
            postsRec: data,
            moment: moment
        });
    }).catch((err)=>{
        console.log('get com error, motivo', err);
        res.status(500).send({ message: 'Erro no processamento', error: err });
    });
});

router.post('/cadastrar/jogo', (req, res)=>{
    let publicacao = new JogoMod({
        nome: req.body.nome,
        dificuldade: req.body.dificuldade,
        criado_aos: req.body.dataCriacao
    });

     publicacao.save().then(data => {
         res.send(data);
     }).catch(err => {
         res.status(500).send({
             message: err.message || "Erro ao fazer o cadastro."
         });
     });
});

module.exports = router;