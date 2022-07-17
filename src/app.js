// Configuração sevidor
/**
 * @author Wagner Alves
 */

'use sctict'

// Firebase App (the core Firebase SDK) is always required and must be listed first

var express = require('express');

var bodyParser = require('body-parser');
var helmet = require('helmet');
global.__basedir = __dirname;




// Index de rotas

const pagseguro = require('./routes/pagseguro.route'); 
const index = require('./routes/index-route'); 

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  next();
});

app.use(helmet());


app.use('/api/pagseguro', pagseguro);
app.use('/', index)

module.exports = app;
