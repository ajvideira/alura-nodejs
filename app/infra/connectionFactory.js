var mysql = require('mysql');

function createDbConnection() {
  console.log('acessou o createDbConnection')

  if (!process.env.NODE_ENV) {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'casadocodigo_nodejs'
    });
  }

  if (process.env.NODE_ENV == 'test') {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'casadocodigo_nodejs_testdadasd'
    });
  }

}

module.exports = function() {
  console.log('acessou o wrapper');
  return createDbConnection;
}
