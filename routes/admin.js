const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categoria');
const Categoria = mongoose.model('categorias');

router.get('/', (req, res) => {
  res.render('admin/index');
})

router.get('/categorias', (req, res) => {
  Categoria.find().lean().then((categorias) => {
    res.render('admin/categorias', { categorias: categorias })
  }).catch((err) => {
    res.send('Erro ao listar categorias: ' + err)
  })
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

//editar
router.get('/categorias/editar/:id', (req, res) => {
  Categoria.findOne({ _id: req.params.id }).lean().then((categorias) => {
    res.render('admin/editcategoria', { categorias: categorias })
  })
})

router.post('/categorias/editar', (req, res) => {
  Categoria.findOne({ _id: req.body.id }).then((categoria) => {
    categoria.nome = req.body.nome
    categoria.slug = req.body.slug

    categoria.save().then(() => {
      req.flash('success_msg', 'Categoria editada com sucesso!')
      res.redirect('/admin/categorias')
    }).catch((err) => {
      req.flash('error_msg', 'Erro ao editar: ' + err)
    })


  })
})



//excluir
router.post('/categorias/excluir', (req, res) => {
  Categoria.deleteOne({ _id: req.body.id }).then(() => {
    req.flash('success_msg', 'Categoria excluída com sucesso!')
    res.redirect('/admin/categorias')
  }).catch((err) => {
    req.flash('error_msg', 'Erro ao excluir: ' + err)
    res.redirect('/admin/categorias')
  })
})

router.get('/postagens', (req, res) => {
  res.send('Página de postagens');
})

module.exports = router;