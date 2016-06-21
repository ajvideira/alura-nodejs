module.exports = function(app) {
  app.get('/', function(request, response, next){

    var connection = app.infra.connectionFactory;
    var produtosDao = new app.infra.ProdutosDao(connection);

    var produtosPromise = produtosDao.lista();
    produtosPromise.then(function(data){
      console.log(data);
      response.render('home/index', {livros: data});
    }).catch(function(erro){
      console.log('Entrou no catch do home.route');
      next(erro);
    });

  });
}
