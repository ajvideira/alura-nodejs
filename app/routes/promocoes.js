module.exports = function(app) {
  app.get('/promocoes/form', function(request, response){
    var connection = app.infra.connectionFactory();
    var produtosDao = new app.infra.ProdutosDao(connection);

    produtosDao.lista(function(err, results, next) {
      response.render('promocoes/form', {lista: results});
    });

    connection.end();
  });

  app.post('/promocoes', function(request, response){
    var promocao = request.body;
    app.get('io').emit('novaPromocao', promocao);
    response.redirect('promocoes/form');
  });
}
