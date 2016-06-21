var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressPromise = require('express-promise');

module.exports = function() {

  var app = express();

  app.use(express.static('./app/public'))
  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  app.use(expressPromise());

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressValidator());

  load('routes', {cwd: 'app'})
    .then('infra')
    .into(app);

  app.use(function(request, response, next){
    response.status(404).render('erro/404');
  });

  app.use(function(error, request, response, next){
    if (error) {
      if (!process.env.NODE_ENV) {
        console.log(error);
        console.log('Renderizar página de erro.')
        response.status(500).render('erro/500');
        return;
      }
      next(error);
    } else {
      next();
    }

  });

  return app;
}
