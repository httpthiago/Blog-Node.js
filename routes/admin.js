const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Página principal do admin');
})

router.get('/categorias', (req, res) => {
  res.send('Página de categorias');
})

router.get('/postagens', (req, res) => {
  res.send('Página de postagens');
})

module.exports = router;