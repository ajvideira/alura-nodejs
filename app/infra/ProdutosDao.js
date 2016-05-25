function ProdutosDao(connection) {
  this._connection = connection;
}

ProdutosDao.prototype.lista = function(callback) {
  this._connection.query('SELECT * FROM livros', callback);
};

ProdutosDao.prototype.salva = function(produto, callback) {
  this._connection.query('INSERT INTO livros set ?', produto, callback);
};

module.exports = function() {
  return ProdutosDao;

};
