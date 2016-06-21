var pgp = require('pg-promise')();

console.log('acessou o createDbConnection')

var db;

if (process.env.NODE_ENV == 'production') {
  var connectionString = process.env.DATABASE_URL;
  //var connectionString = "postgres://postgres:root@localhost:5432/casadocodigo_nodejs";
}

if (process.env.NODE_ENV == 'dev') {
  var connectionString = "postgres://postgres:root@localhost:5432/casadocodigo_nodejs";
}

if (process.env.NODE_ENV == 'test') {
  var connectionString = "postgres://postgres:root@localhost:5432/casadocodigo_nodejs_test";
}

db = pgp(connectionString);

module.exports = function() {
  return db;
}
