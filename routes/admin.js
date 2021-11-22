const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categoria');
const Categoria = mongoose.model('categorias');

router.get('/', (req, res) => {
  res.render('admin/index');
})

router.get('/categorias', (req, res) => {
  res.render('admin/categorias');
})

router.get('/categorias/add', (req, res) => {
  res.render('admin/addcategorias');
})

router.post('/categorias/nova', (req, res) => {

  //validando formulário
  var erros = []
  if (!req.body.nome) {
    erros.push({ texto: 'Texto inváldo.' })
  }

  if (!req.body.slug) {
    erros.push({ texto: 'Slug inválido.' })
  }

  if (req.body.nome < 2) {
    erros.push({ texto: 'Nome muito pequeno.' })
  }

  if (erros.length > 0) {
    res.render('admin/addcategorias', { erros: erros })
  } else {
    const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(() => {
      req.flash('success_msg', 'Categoria criada com sucesso!')
      res.redirect('/admin/categorias')
    }).catch((err) => {
      req.flash('error_msg', 'Erro ao criar categora: ' + err)
      res.redirect('/admin/categorias')
    })

  }



})

router.get('/postagens', (req, res) => {
  res.send('Página de postagens');
})

module.exports = router;