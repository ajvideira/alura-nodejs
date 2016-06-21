module.exports = function(app) {
  app.get('/produtos', function(request, response){

    var connection = app.infra.connectionFactory;
    var produtosDao = new app.infra.ProdutosDao(connection);

    var produtosPromise = produtosDao.lista();
    produtosPromise.then(function(data){
      console.log(data);
      response.format({
        html: function() {
          response.render('produtos/lista', {lista: data});
        },
        json: function() {
          response.json(data);
        }
      });
    }).catch(function(erro){
      console.log('Entrou no catch do produtos.route: ' + erro);
      next(erro);
    });
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

      var connection = app.infra.connectionFactory;
      var produtosDao = new app.infra.ProdutosDao(connection);

      var produtosPromise = produtosDao.salva(produto);
      produtosPromise.then(function(data){
        console.log(data);
        response.redirect('/produtos');
      }).catch(function(erro){
        console.log('Entrou no catch do produtos.route.salva');
        next(erro);
      });
  });

};
