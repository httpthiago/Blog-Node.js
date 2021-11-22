// Módulos
const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const adminRoute = require('./routes/admin');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

// Configurações
// Session
app.use(session({
  secret: 'cursodenode',
  resave: true,
  saveUninitialized: true
}))

app.use(flash());

// Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})
// Formato de entrada
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Template Engine (Handlebars)
const hbs = handlebars.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Banco conectado com sucesso!');
}).catch((err) => {
  console.log('Erro ao conectar-se ao banco: ' + err);
})

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/admin', adminRoute);

// Outros
const PORT = 8081;
app.listen(PORT, () => {
  console.log('Servidor funcionando com sucesso!');
})