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

router.get('/feed/editar/:id', (req, res) => {
    JogoMod.findOne({_id: req.params.id}).then((data) => {
        res.render('pages/editar',{
            post: data,
            moment: moment
        });
    }).catch((err)=>{
        console.log('get com error, motivo', err);
        res.status(500).send({ message: 'Erro no processamento', error: err });
    });
});

router.get('/feed/pesquisar', (req, res) => {
    res.render('pages/pesquisar');
});

router.get('/feed/pesquisar/:nome', (req, res) => {
    JogoMod.find( {"nome":{ $regex: req.params.nome, $options: 'i' }} ).limit(10).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log('get com error, motivo', err);
        res.status(500).send({ message: 'Erro no processamento', error: err });
    });
});

router.post('/feed/editar', (req, res)=>{
    JogoMod.findOneAndUpdate( { _id: req.body.id }, {$set:{ dificuldade: req.body.dificuldade, nome: req.body.nome }},
        {new: true }, (err, doc) => {
            if (err) {
                return res.send("Erro ao atualizar");
            }
            return res.json({data:doc, message:"atualizado com sucesso"});
        }
    )
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