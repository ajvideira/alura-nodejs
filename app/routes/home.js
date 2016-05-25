module.exports = function(app) {
  app.get('/', function(request, response){

    var connection = app.infra.connectionFactory();
    var produtosDao = new app.infra.ProdutosDao(connection);

    produtosDao.lista(function(err, results, next) {
      if (err) {
        next(err);
      }
      response.render('home/index', {livros: results});
    });

    connection.end();
  });
}
