function ProdutosDao(connection) {
    this._connection = connection;
}

ProdutosDao.prototype.lista = function() {
  var results = [];

var conexao2 = this._connection;

  return new Promise(function(resolve, reject){
    conexao2.query('SELECT * FROM livros')
      .then(function(data){
        resolve(data);
      }, function(erro){
        console.log(erro);
        reject(erro);
      }).catch(function(erro){
        console.log('Entrou no catch do DAO');
        console.log(erro);
        reject(new Error('Ocorreu um erro'));
      });
  });
};

ProdutosDao.prototype.createTable = function() {
  var conexao2 = this._connection;

  return new Promise(function(resolve, reject){
    conexao2.query('CREATE TABLE livros(id serial NOT NULL, titulo text, descricao text, preco double precision, CONSTRAINT pk_livros PRIMARY KEY (id))')
      .then(function(data){
        resolve(data);
      }, function(erro){
        console.log(erro);
        reject(erro);
      }).catch(function(erro){
        console.log('Entrou no catch do DAO');
        console.log(erro);
        reject(new Error('Ocorreu um erro'));
      });
  });
};

ProdutosDao.prototype.salva = function(produto) {
  var conexao2 = this._connection;

  return new Promise(function(resolve, reject){
    conexao2.query('INSERT INTO livros (titulo, descricao, preco)  values (${titulo}, ${descricao}, ${preco})', produto)
      .then(function(data){
        resolve(data);
      }, function(erro){
        console.log(erro);
        reject(erro);
      }).catch(function(erro){
        console.log('Entrou no catch do DAO');
        console.log(erro);
        reject(new Error('Ocorreu um erro'));
      });
  });
};

module.exports = function() {
  return ProdutosDao;
};
