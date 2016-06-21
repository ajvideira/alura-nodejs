var pgp = require('pg-promise')();

console.log('acessou o createDbConnection')

var db;

if (!process.env.NODE_ENV) {
  var connectionString = "postgres://qgdefwysamxxra:Bv_XPqpiltHwoDx1FU_BwwV-EU@ec2-50-19-222-159.compute-1.amazonaws.com:5432/d43dstqa82e03e";
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
