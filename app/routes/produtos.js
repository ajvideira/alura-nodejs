module.exports = function(app) {
  app.get('/produtos', function(request, response){

    var connection = app.infra.connectionFactory;
    var produtosDao = new app.infra.ProdutosDao(connection);

    produtosDao.lista(function(err, results, next) {
      if (err) {
        next(err);
      }
      response.format({
        html: function() {
          response.render('produtos/lista', {lista: results});
        },
        json: function() {
          response.json(results);
        }
      });
    });

    connection.end();
  });

  app.get('/produtos/form', function(request, response) {

      response.render('produtos/form', {erros: {}, produto: {}});

  });

  app.post('/produtos', function(request, response) {

      var produto = request.body;
      console.log(produto);

      var validatorTitulo = request.assert('titulo', 'Título é obrigatório');
      validatorTitulo.notEmpty();

      var erros = request.validationErrors();
      if (erros) {
        response.format({
          html: function() {
            response.status(400).render('produtos/form', {erros: erros, produto: produto});
          },
          json: function() {
            response.status(400).json(erros);
          }
        });
        return;
      }

      var connection = app.infra.connectionFactory();
      var produtosDao = new app.infra.ProdutosDao(connection);

      produtosDao.salva(produto, function(err, results){
        response.redirect('/produtos');
      });
  });

};
