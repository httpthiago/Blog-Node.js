const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/index');
})

router.get('/categorias', (req, res) => {
  res.render('admin/categorias');
})

router.get('/categorias/add', (req, res) => {
  res.render('admin/addcategorias');
})

router.get('/postagens', (req, res) => {
  res.send('Página de postagens');
})

module.exports = router;