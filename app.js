// Módulos
  const express = require('express');
  const handlebars = require('express-handlebars');
  const mongoose = require('mongoose');
  const adminRoute = require('./routes/admin');
  const path = require('path');
  const app = express();

// Configurações
  // Formato de entrada
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

  // Template Engine (Handlebars)
    const hbs = handlebars.create({defaultLayout: 'main'});
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
  
  // Mongoose
    // TODO

  // Public
    app.use(express.static(path.join(__dirname, 'public')));

// Rotas
  app.use('/admin', adminRoute);

// Outros
  const PORT = 8081;
  app.listen(PORT, () => {
    console.log('Servidor funcionando com sucesso!');
  })